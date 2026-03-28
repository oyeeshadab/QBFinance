import {
  CurrentMonthTxResponse,
  SMSTransaction,
  Transaction,
} from '@database/types';
import { getDB } from '../db';

export const TransactionSMSRepo = {
  getExistingTransactionIds: async (ids: number[]): Promise<number[]> => {
    if (!ids.length) return [];

    try {
      const db = await getDB();

      const placeholders = ids.map(() => '?').join(',');

      const res = await db.executeSql(
        `SELECT * FROM transactionSMS WHERE dateTime IN (${placeholders})`,
        ids,
      );

      const rows = res[0].rows.raw();
      console.log('🚀 ~ rows:', rows);

      // return rows.map((r: any) => Number(r.dateTime)); // 👈 return existing ids
      return rows;
    } catch (error) {
      console.log('getExistingTransactionIds error', error);
      return [];
    }
  },
  getMissingTransactionIds: async (ids: number[]): Promise<number[]> => {
    if (!ids.length) return [];

    try {
      const db = await getDB();

      const placeholders = ids.map(() => '?').join(',');

      const res = await db.executeSql(
        `SELECT dateTime FROM transactionSMS WHERE isDeleted = 0 AND dateTime IN (${placeholders})`,
        ids,
      );

      const rows = res[0].rows.raw();

      const existingIds = new Set(rows.map((r: any) => Number(r.dateTime)));

      const missingIds = ids.filter(id => !existingIds.has(id));

      return missingIds;
    } catch (error) {
      console.log('getMissingTransactionIds error', error);
    }
  },

  insertBulkSMS: async (smsArray: number[]) => {
    if (!smsArray.length) return;
    try {
      const db = await getDB();

      const placeholders = smsArray.map(() => `(?, 0)`).join(',');
      const values = smsArray.map(String);

      const dt = await db.executeSql(
        `INSERT OR IGNORE INTO transactionSMS (dateTime, isDeleted)
       VALUES ${placeholders}`,
        values,
      );
      console.log('🚀 ~ dt:', dt);
      return { success: true };
    } catch (error) {
      console.log('insertBulkSMS error', error);
    }
  },
  deleteSMSTransaction: async (payload: SMSTransaction) => {
    if (!payload.datetime && !payload.date) {
      throw new Error('SMS ID is required for update.');
    }

    try {
      const db = await getDB();

      const res = await db.executeSql(
        `UPDATE transactionSMS
         SET isDeleted = 1
          WHERE dateTime = ?`,
        [payload?.dateTime || payload.date],
      );

      return {
        success: true,
        rowsAffected: res[0].rowsAffected,
      };
    } catch (error) {
      console.log('updateTransaction error', error);

      return {
        success: false,
      };
    }
  },
};
