import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { CategoryItem } from './CategoryGrid';
import { CategoriesRepo } from '@database/repository';
import { darkenHex, lightenHex } from '@utils/color';

const DEFAULT_ICON: CategoryItem = {
  id: -1,
  icon: 'Shoppping',
  iconLibrary: 'Feather',
  name: 'Create New',
  color: '#BE96FA',
};

export const useCategoryGrid = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState('#000000');

  // Cache categories
  const categoriesCache = useRef<CategoryItem[] | null>(null);

  const getAllCategories = useCallback(async (forceRefresh = false) => {
    try {
      if (!forceRefresh && categoriesCache.current) {
        setCategoryList(categoriesCache.current);
        setLoading(false);
        return;
      }

      const res = await CategoriesRepo.getAllCategories();

      categoriesCache.current = res; // store cache
      setCategoryList(res);
    } catch (error) {
      console.log('Category fetch error:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  // Call this when a new category is created
  const refreshCategories = useCallback(() => {
    categoriesCache.current = null;
    getAllCategories(true);
  }, [getAllCategories]);

  const data = useMemo(() => {
    return [...categoryList, DEFAULT_ICON];
  }, [categoryList]);

  const keyExtractor = useCallback(
    (item: CategoryItem) => item.id.toString(),
    [],
  );

  const currentGradient = useMemo(
    () => [lightenHex(selectedColor), darkenHex(selectedColor), '#000000'],
    [selectedColor],
  );

  return {
    data,
    loading,
    keyExtractor,
    refreshCategories,
    currentGradient,
  };
};
