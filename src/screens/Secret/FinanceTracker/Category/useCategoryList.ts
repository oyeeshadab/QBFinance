import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { CategoriesRepo } from '@database/repository';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  transactionCount?: number;
};

export const useCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Load categories
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CategoriesRepo.getAllCategories();
      setCategories(res);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh categories (stable)
  const refreshCategories = useCallback(async () => {
    await loadCategories();
  }, [loadCategories]);

  // Add category
  const addCategory = useCallback(
    async (name: string, icon: string, color: string): Promise<boolean> => {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter a category name');
        return false;
      }

      const exists = categories.some(
        cat => cat.name.toLowerCase() === name.trim().toLowerCase(),
      );

      if (exists) {
        Alert.alert('Error', 'Category already exists');
        return false;
      }

      try {
        await CategoriesRepo.createCategory({
          id: Number(Date.now().toString()),
          name: name.trim(),
          icon,
          color,
        });

        await refreshCategories();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    [categories, refreshCategories],
  );

  // Update category
  const updateCategory = useCallback(
    async (
      id: string,
      name: string,
      icon: string,
      color: string,
    ): Promise<boolean> => {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter a category name');
        return false;
      }

      const exists = categories.some(
        cat =>
          cat.id !== id && cat.name.toLowerCase() === name.trim().toLowerCase(),
      );

      if (exists) {
        Alert.alert('Error', 'Duplicate category name');
        return false;
      }

      try {
        await CategoriesRepo.updateCategory({
          id: Number(id),
          name: name.trim(),
          icon,
          color,
        });

        await refreshCategories();
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    [categories, refreshCategories],
  );

  // Delete category
  const deleteCategory = useCallback(
    async (id: number, deleteCategoryFlag?: boolean): Promise<boolean> => {
      try {
        await CategoriesRepo.deleteCategory(id);
        await refreshCategories();
        if (deleteCategoryFlag) {
          navigation.goBack();
          return true;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshCategories],
  );

  // Get category
  const getCategoryById = useCallback(
    (id: string) => categories.find(cat => cat.id === id),
    [categories],
  );

  // Initial load
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // FIXED: Proper useFocusEffect
  useFocusEffect(
    useCallback(() => {
      refreshCategories();
    }, [refreshCategories]),
  );

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    refreshCategories,
  };
};
