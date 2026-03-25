import { Category } from '@database/types';
import { getDB } from '../db';

export const CategoriesRepo = {
  getAllCategories: async (): Promise<Category[]> => {
    const db = await getDB();

    const res = await db.executeSql(`
      SELECT 
      *
    FROM categories
    `);

    return res[0].rows.raw();
  },
  createCategory: async (payload: Category) => {
    try {
      const db = await getDB();

      const res = await db.executeSql(
        `INSERT OR IGNORE INTO categories (name, icon, color) VALUES (?, ?, ?)`,
        [payload?.name, payload?.icon, payload?.color],
      );

      return {
        success: true,
        insertId: res[0].insertId,
      };
    } catch (error) {
      console.log('createCategory error', error);

      return {
        success: false,
      };
    }
  },
};
