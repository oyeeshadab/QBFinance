// import { TransactionSMSRepo } from '@database/repository/transactionsSMS.repo';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { useCallback, useEffect, useState } from 'react';
// import { PermissionsAndroid, Platform } from 'react-native';
// import SmsAndroid from 'react-native-get-sms-android';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// type SMSMessage = {
//   body: string;
//   date: number;
//   address: string;
// };

// type Transaction = {
//   id: string;
//   body: string;
//   amount: string | null;
//   type: 'debit' | 'credit' | 'unknown';
//   date: number;
// };

// const TRANSACTION_KEYWORDS = ['debited', 'credited', 'inr', 'RS'];

// export const useTransactionMessages = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigation = useNavigation();

//   // useEffect(() => {
//   //   fetchTransactions();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);
//   useFocusEffect(
//     useCallback(() => {
//       fetchTransactions();
//     }, []),
//   );

//   // ✅ Request Permission
//   const requestPermission = useCallback(async () => {
//     if (Platform.OS !== 'android') return false;

//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       setError(`Permission error ${err}`);
//       return false;
//     }
//   }, []);

//   // ✅ Check if SMS is transaction
//   const isTransactionSMS = (message: string) => {
//     const lower = message.toLowerCase();
//     return TRANSACTION_KEYWORDS.some(k => lower.includes(k));
//   };

//   // ✅ Extract amount
//   const extractAmount = (message: string): string | null => {
//     const match = message.match(/₹\s?\d+(\.\d+)?/);
//     return match ? match[0] : null;
//   };

//   // ✅ Detect type
//   const detectType = (message: string): Transaction['type'] => {
//     const lower = message.toLowerCase();

//     if (
//       lower.includes('debited') ||
//       lower.includes('spent') ||
//       lower.includes('paid')
//     ) {
//       return 'debit';
//     }

//     if (lower.includes('credited') || lower.includes('received')) {
//       return 'credit';
//     }

//     return 'unknown';
//   };

//   // ✅ Fetch SMS
//   const fetchTransactions = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     const hasPermission = await requestPermission();
//     if (!hasPermission) {
//       setError('SMS permission denied');
//       setLoading(false);
//       return;
//     }

//     const filter = {
//       box: 'inbox',
//       maxCount: 200,
//     };

//     SmsAndroid.list(
//       JSON.stringify(filter),
//       (fail: string) => {
//         setError(fail);
//         setLoading(false);
//       },
//       async (_count: number, smsList: string) => {
//         console.log(
//           '🚀 ~ useTransactionMessages ~ _count:',
//           JSON.parse(smsList),
//         );
//         try {
//           const messages: SMSMessage[] = JSON.parse(smsList);

//           const parsed: Transaction[] = messages
//             .filter(sms => isTransactionSMS(sms.body))
//             .map(sms => ({
//               id: `${sms.date}-${sms.address}`,
//               body: sms.body,
//               amount: extractAmount(sms.body),
//               type: detectType(sms.body),
//               date: sms.date,
//             }));

//           const d = await fetchAndMatchTransaction(parsed);
//           console.log(
//             '🚀 ~ useTransactionMessages ~ parsed:🚀 ~ useTransactionMessages ~ parsed:',
//             d,
//             parsed,
//           );
//           setTransactions(d);
//         } catch (e) {
//           setError('Parsing error');
//         } finally {
//           setLoading(false);
//         }
//       },
//     );
//   }, [requestPermission]);

//   const fetchAndMatchTransaction = async smsArray => {
//     const dates = smsArray.map(sms => sms.date);
//     const existingIds = await TransactionSMSRepo.getExistingTransactionIds(
//       dates,
//     );
//     if (existingIds.length === 0) {
//       await TransactionSMSRepo.insertBulkSMS(dates);
//       return smsArray;
//     }
//     console.log(
//       '🚀 ~ fetchAndMatchTransaction ~ existingIds:',
//       JSON.stringify(existingIds),
//       JSON.stringify(smsArray),
//     );
//     console.log(
//       '🚀 ~ fetchAndMatchTransaction ~ filterValidSMS(existingIds, smsArray):',
//     );
//     return filterValidSMS(smsArray, existingIds);
//   };

//   const filterValidSMS = (smsArray, dbRows) => {
//     // Convert DB dateTime → number & create fast lookup
//     const validSet = new Set(
//       dbRows
//         .filter(row => row.isDeleted === 0)
//         .map(row => Number(row.dateTime)),
//     );

//     // Filter SMS
//     return smsArray.filter(sms => validSet.has(sms.date));
//   };

//   const extractAmountFromMessageBody = (message: string): string | null => {
//     if (!message) return null;

//     const text = message.replace(/,/g, ''); // remove commas

//     // ❌ Ignore OTP messages
//     if (/otp|one[- ]?time password/i.test(text)) {
//       return null;
//     }

//     // Match patterns like:
//     // INR 1234, INR 1234.56, Rs 123, ₹1234, 1234 INR
//     const regex =
//       /(₹|rs\.?|inr)\s?(\d+(\.\d{1,2})?)|(\d+(\.\d{1,2})?)\s?(₹|rs\.?|inr)/i;

//     const match = text.match(regex);

//     if (match) {
//       const amount = match[2] || match[4];
//       return amount ? `${Number(amount)}` : null;
//     }

//     // Fallback: plain number after keywords
//     const fallback = text.match(
//       /(credited|debited|spent|paid|received)\s?(\d+(\.\d{1,2})?)/i,
//     );

//     if (fallback) {
//       return `${Number(fallback[2])}`;
//     }

//     return null;
//   };

//   const handleAdd = (item: any) => {
//     item.amount = extractAmountFromMessageBody(item?.body);
//     item.type = detectType(item?.body) === 'credit' ? 'income' : 'expense';
//     item.datetime = new Date(item.date).toISOString();
//     item.dateTime = item.date;
//     item.smsType = true;
//     item.id = undefined;
//     navigation.navigate('AppNavigator', {
//       screen: 'AddTransaction',
//       params: { item },
//     });
//     ReactNativeHapticFeedback.trigger('notificationSuccess');

//     console.log('Add:', item);
//   };

//   const handleDelete = (item: any) => {
//     console.log('🚀 ~ handleDelete ~ item:', item);
//     ReactNativeHapticFeedback.trigger('notificationWarning');
//     item.datetime = item.date;
//     // TransactionSMSRepo.deleteSMSTransaction(item);
//     setTransactions(transactions.filter(t => t.date !== item.date));
//     console.log(
//       '🚀 ~ handleDelete ~ transactions:',
//       transactions.filter(t => t.date !== item.date),
//     );
//     // console.log('Delete:', item);
//   };

//   return {
//     transactions,
//     loading,
//     error,
//     handleDelete,
//     handleAdd,
//     fetchTransactions,
//     requestPermission,
//     extractAmountFromMessageBody,
//   };
// };

import { TransactionSMSRepo } from '@database/repository/transactionsSMS.repo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState, useRef } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Types
type SMSMessage = {
  body: string;
  date: number;
  address: string;
};

type Transaction = {
  id: string;
  body: string;
  amount: string | null;
  type: 'debit' | 'credit' | 'unknown';
  date: number;
};

type DBRow = {
  dateTime: string;
  isDeleted: number;
};

// Constants
const TRANSACTION_KEYWORDS = ['debited', 'credited', 'inr', 'RS'] as const;
const SMS_FILTER = {
  box: 'inbox' as const,
  maxCount: 200,
};

// Regex patterns (compiled once for better performance)
const AMOUNT_REGEX = /₹\s?\d+(\.\d+)?/;
const OTP_REGEX = /otp|one[- ]?time password/i;
const CURRENCY_REGEX =
  /(₹|rs\.?|inr)\s?(\d+(\.\d{1,2})?)|(\d+(\.\d{1,2})?)\s?(₹|rs\.?|inr)/i;
const FALLBACK_REGEX =
  /(credited|debited|spent|paid|received)\s?(\d+(\.\d{1,2})?)/i;

export const useTransactionMessages = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const isMounted = useRef(true);

  // Cleanup on unmount
  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      fetchTransactions();

      return () => {
        isMounted.current = false;
      };
    }, []),
  );

  // ✅ Request Permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      setError(`Permission error ${err}`);
      return false;
    }
  }, []);

  // ✅ Check if SMS is transaction
  const isTransactionSMS = useCallback((message: string): boolean => {
    const lower = message.toLowerCase();
    return TRANSACTION_KEYWORDS.some(k => lower.includes(k));
  }, []);

  // ✅ Extract amount
  const extractAmount = useCallback((message: string): string | null => {
    const match = message.match(AMOUNT_REGEX);
    return match ? match[0] : null;
  }, []);

  // ✅ Detect type
  const detectType = useCallback((message: string): Transaction['type'] => {
    const lower = message.toLowerCase();

    if (
      lower.includes('debited') ||
      lower.includes('spent') ||
      lower.includes('paid')
    ) {
      return 'debit';
    }

    if (lower.includes('credited') || lower.includes('received')) {
      return 'credit';
    }

    return 'unknown';
  }, []);

  // ✅ Filter valid SMS from database
  const filterValidSMS = useCallback(
    (smsArray: Transaction[], dbRows: DBRow[]): Transaction[] => {
      const validSet = new Set(
        dbRows
          .filter(row => row.isDeleted === 0)
          .map(row => Number(row.dateTime)),
      );

      return smsArray.filter(sms => validSet.has(sms.date));
    },
    [],
  );

  // ✅ Fetch and match with database
  const fetchAndMatchTransaction = useCallback(
    async (smsArray: Transaction[]): Promise<Transaction[]> => {
      const dates = smsArray.map(sms => sms.date);
      const existingIds = await TransactionSMSRepo.getExistingTransactionIds(
        dates,
      );
      const nonExistingIds = dates.filter(
        date =>
          !existingIds.some((row: DBRow) => Number(row.dateTime) === date),
      );
      if (existingIds.length === 0) {
        await TransactionSMSRepo.insertBulkSMS(dates);
        return smsArray;
      }
      if (nonExistingIds.length > 0) {
        await TransactionSMSRepo.insertBulkSMS(dates);
        return filterValidSMS(
          smsArray,
          nonExistingIds.map(date => ({
            dateTime: String(date),
            isDeleted: 0,
          })),
        );
      }

      return filterValidSMS(smsArray, existingIds);
    },
    [filterValidSMS],
  );

  // ✅ Process SMS messages
  const processSMSMessages = useCallback(
    (messages: SMSMessage[]): Transaction[] => {
      return messages
        .filter(sms => isTransactionSMS(sms.body))
        .map(sms => ({
          id: `${sms.date}-${sms.address}`,
          body: sms.body,
          amount: extractAmount(sms.body),
          type: detectType(sms.body),
          date: sms.date,
        }));
    },
    [isTransactionSMS, extractAmount, detectType],
  );

  // ✅ Fetch SMS
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setError('SMS permission denied');
      setLoading(false);
      return;
    }

    SmsAndroid.list(
      JSON.stringify(SMS_FILTER),
      (fail: string) => {
        if (isMounted.current) {
          setError(fail);
          setLoading(false);
        }
      },
      async (_count: number, smsList: string) => {
        try {
          const messages: SMSMessage[] = JSON.parse(smsList);
          const parsedTransactions = processSMSMessages(messages);
          const validatedTransactions = await fetchAndMatchTransaction(
            parsedTransactions,
          );

          if (isMounted.current) {
            setTransactions(validatedTransactions);
          }
        } catch (e) {
          if (isMounted.current) {
            setError('Parsing error');
          }
        } finally {
          if (isMounted.current) {
            setLoading(false);
          }
        }
      },
    );
  }, [requestPermission, processSMSMessages, fetchAndMatchTransaction]);

  // ✅ Extract amount with advanced patterns
  const extractAmountFromMessageBody = useCallback(
    (message: string): string | null => {
      if (!message) return null;

      const text = message.replace(/,/g, '');

      // Ignore OTP messages
      if (OTP_REGEX.test(text)) {
        return null;
      }

      // Match currency patterns
      const match = text.match(CURRENCY_REGEX);
      if (match) {
        const amount = match[2] || match[4];
        return amount ? `${Number(amount)}` : null;
      }

      // Fallback pattern
      const fallback = text.match(FALLBACK_REGEX);
      if (fallback) {
        return `${Number(fallback[2])}`;
      }

      return null;
    },
    [],
  );

  // ✅ Handle add transaction
  const handleAdd = useCallback(
    (item: any) => {
      const enrichedItem = {
        ...item,
        amount: extractAmountFromMessageBody(item?.body),
        type: detectType(item?.body) === 'credit' ? 'income' : 'expense',
        datetime: new Date(item.date).toISOString(),
        dateTime: item.date,
        smsType: true,
        id: undefined,
      };

      navigation.navigate('AppNavigator', {
        screen: 'AddTransaction',
        params: { item: enrichedItem },
      });

      ReactNativeHapticFeedback.trigger('notificationSuccess');
    },
    [navigation, extractAmountFromMessageBody, detectType],
  );

  // ✅ Handle delete transaction
  const handleDelete = useCallback((item: Transaction) => {
    console.log('🚀 ~ useTransactionMessages ~ item:', item.date, transactions);
    ReactNativeHapticFeedback.trigger('notificationWarning');

    // Optimistic update

    setTransactions(prev => {
      const updated = prev.filter(t => t.date !== item.date);
      return updated;
    });
    TransactionSMSRepo.deleteSMSTransaction(item);

    // setTransactions([]);
    // setTransactions(prev => prev.filter(t => t.date !== item.date));

    // TODO: Uncomment when database delete is implemented
    // TransactionSMSRepo.deleteSMSTransaction({ ...item, datetime: item.date });
  }, []);

  return {
    transactions,
    loading,
    error,
    handleDelete,
    handleAdd,
    fetchTransactions,
    requestPermission,
    extractAmountFromMessageBody,
  };
};
