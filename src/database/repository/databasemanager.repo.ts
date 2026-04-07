import { runMigrations } from '@database/migrations';
import { DB_NAME, getDB } from '../db';
import SQLite from 'react-native-sqlite-storage';
import { restartWithCacheClear } from 'rn-restart';

export const DatabaseManagerRepo = {
  dropDatabase: async () => {
    const db = await getDB();
    await db.close();
    await SQLite.deleteDatabase({
      name: DB_NAME,
      location: 'default',
    });
    restartWithCacheClear();
    return true;
  },
};
