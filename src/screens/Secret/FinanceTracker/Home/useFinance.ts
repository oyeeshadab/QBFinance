import { useTheme } from '@theme/ThemeProvider';
import { useCallback, useState } from 'react';
import { CurrentMonthTxResponse, TransactionSection } from '@database/types';
import { TransactionRepo } from '@database/repository';
import { useFocusEffect } from '@react-navigation/native';

export const useFinance = () => {
  const { theme } = useTheme();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionSection[]>([]);
  const [total_expense, setTotal_expense] = useState<number>(0);
  const [total_income, setTotal_income] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          const res: CurrentMonthTxResponse =
            await TransactionRepo.getCurrentMonthTransactions();
          if (isActive) {
            setTotal_income(res?.summary?.total_income);
            setTotal_expense(res?.summary?.total_expense);
            if (isActive)
              setWalletBalance(
                res?.summary?.total_income - res?.summary?.total_expense,
              );
            const sections = Object.keys(res?.transactions || {}).map(date => ({
              title: date,
              data: res?.transactions[date],
            }));
            setTransactions(sections);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const Buttons = [
    {
      title: 'Add',
      iconLibrary: 'Ionicons',
      iconName: 'add',
      color: theme.colors.black,
      background: true,
    },
  ];

  const [showMoney, setShowMoney] = useState(true);
  const toggleMoney = () => {
    setShowMoney(!showMoney);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return {
    Buttons,
    transactions,
    showMoney,
    toggleMoney,
    walletBalance,
    total_expense,
    total_income,
    formatDate,
  };
};
