import { Category } from '@database/types';
import { getDB } from '../db';

export const CategoriesRepo = {
  getAllCategories: async (): Promise<any[]> => {
    const db = await getDB();

    const res = await db.executeSql(`
    SELECT 
      c.*,
      COUNT(t.id) as transactionCount
    FROM categories c
    LEFT JOIN transactions t 
      ON t.category_id = c.id
    GROUP BY c.id
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
  updateCategory: async (payload: Category) => {
    try {
      const db = await getDB();

      await db.executeSql(
        `UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?`,
        [payload?.name, payload?.icon, payload?.color, payload?.id],
      );

      return {
        success: true,
      };
    } catch (error) {
      console.log('updateCategory error', error);

      return {
        success: false,
      };
    }
  },
  deleteCategory: async (id: number) => {
    try {
      const db = await getDB();

      await db.executeSql(`DELETE FROM categories WHERE id = ?`, [id]);

      return {
        success: true,
      };
    } catch (error) {
      console.log('deleteCategory error', error);

      return {
        success: false,
      };
    }
  },
};
