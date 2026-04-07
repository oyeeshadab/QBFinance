// import { useTheme } from '@theme/ThemeProvider';
import { CategoriesRepo } from '@database/repository';
import { Category } from '@database/types';
import { useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useCreateCategory = (item: Category) => {
  const isEditMode = item?.hasOwnProperty('id');

  const categoryNameRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const colors = [
    '#A78BFA',
    '#F472B6',
    '#60A5FA',
    '#34D399',
    '#FBBF24',
    '#F87171',
  ];
  const [selectedColorCat, setSelectedColorCat] = useState(
    isEditMode ? item?.color : '',
  );
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [selectedCategory, setSelectedCategory] = useState(
    isEditMode ? item?.icon : 'Default',
  );
  const [categoryName, setCategoryName] = useState(
    isEditMode ? item?.name : '',
  );

  const handlePress = () => {
    categoryNameRef.current?.focus();
  };

  const createCategory = async () => {
    if (!categoryName.trim()) {
      handlePress();
      return;
    } else {
      CategoriesRepo.createCategory({
        name: categoryName,
        icon: selectedCategory,
        color: selectedColorCat,
      }).then(res => {
        if (res?.success) {
          navigation.goBack();
        }
      });
    }
  };

  const updateCategory = async () => {
    if (!categoryName.trim()) {
      handlePress();
      return;
    } else {
      CategoriesRepo.updateCategory({
        id: item.id,
        name: categoryName,
        icon: selectedCategory,
        color: selectedColorCat,
      } as Category).then(res => {
        if (res?.success) {
          navigation.goBack();
        }
      });
    }
  };

  const deleteCategory = async () => {
    const id = item.id || -1;
    CategoriesRepo.deleteCategory(id).then(res => {
      if (res?.success) {
        navigation.goBack();
      }
    });
  };

  const buttonConfig = useMemo(() => {
    if (!categoryName.trim())
      return { label: 'Add Category Name', disabled: true };
    if (isEditMode) return { label: 'Update Category', disabled: true };
    return { label: 'Create Category', disabled: true };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return {
    type,
    colors,
    setType,
    selectedCategory,
    setSelectedCategory,
    selectedColorCat,
    setCategoryName,
    setSelectedColorCat,
    categoryNameRef,
    categoryName,
    createCategory,
    updateCategory,
    deleteCategory,
    buttonConfig,
  };
};
