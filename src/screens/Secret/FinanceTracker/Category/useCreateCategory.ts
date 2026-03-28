// import { useTheme } from '@theme/ThemeProvider';
import { CategoriesRepo } from '@database/repository';
import { Category } from '@database/types';
import { useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useCreateCategory = () => {
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
  const [selectedColorCat, setSelectedColorCat] = useState<string>('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [selectedCategory, setSelectedCategory] = useState('Default');
  const [categoryName, setCategoryName] = useState('');

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

  const buttonConfig = useMemo(() => {
    if (!categoryName.trim())
      return { label: 'Add Category Name', disabled: true };
    return { label: 'Create Category', disabled: true };
    // if (!selectedCategory?.id)
    //   return { label: 'Select Category', disabled: true };
    // if (!amount || Number(amount) <= 0)
    //   return { label: 'Add Amount', disabled: true };
    // return {
    //   label: item ? 'Edit Transaction' : 'Add Transaction',
    //   disabled: false,
    // };
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
    buttonConfig,
  };
};
