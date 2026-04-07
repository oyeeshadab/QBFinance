import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CategoryIcon,
  IconName,
} from '@components/FinanceTracker/Components/CategoryIconComponent';
import { Toast } from '@components/Toast/Toast';
import BottomSheetComponent, {
  BottomSheetRef,
} from '@components/BottomSheet/BottomSheetComponent';
import { darkenHex } from '@utils/color';
import ActionButton from '@components/FinanceTracker/Components/ActionButton';
import { BtnType } from '@app-types/index';
import { useStyle } from './styles';
import { AllCategoriesIcon } from '@components/FinanceTracker/Components/CategoryGrid/AllCategories';
import { useCreateCategory } from './useCreateCategory';
import ColorPickerComponent from '@components/ColorPicker/ColorPicker';
import Header from '@components/FinanceTracker/Header/Header';
import { useCategoryList } from './useCategoryList';
import { useRoute } from '@react-navigation/native';
import { Category } from '@database/types';

export const CreateCategorySheet = () => {
  const route = useRoute();
  const { item } = (route.params as { item?: Category }) || {};
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  // const { item } = route?.params || {};
  const isEditMode = item?.hasOwnProperty('id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const {
    colors,
    categoryNameRef,
    categoryName,
    setCategoryName,
    buttonConfig,
    selectedColorCat,
    setSelectedColorCat,
    createCategory,
    updateCategory,
    selectedCategory,
    setSelectedCategory,
  } = useCreateCategory(item);

  const styles = useStyle();
  const { deleteCategory } = useCategoryList();

  const handleDelete = async (id: number) => {
    await deleteCategory(id, true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
          <Header
            backButton
            deleteButton={isEditMode}
            deleteFun={() => handleDelete(item?.id!)}
          />

          <View style={styles.content}>
            <View style={styles.scrollViewContent}>
              <View style={styles.amountCard}>
                <View style={styles.itemWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => bottomSheetRef.current?.open()}
                    style={[
                      styles.colorItem,
                      { backgroundColor: selectedColorCat },
                    ]}
                  >
                    <CategoryIcon icon_name={item?.icon as IconName} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  ref={categoryNameRef}
                  value={categoryName}
                  style={styles.input}
                  placeholder="Category Name"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  onChangeText={setCategoryName}
                />
              </View>

              <FlatList
                data={colors}
                horizontal
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: item,
                        marginRight: 12,
                        borderWidth: selectedColorCat === item ? 3 : 0,
                        borderColor: darkenHex('#ffffff'),
                      },
                    ]}
                    onPress={() => setSelectedColorCat(item)}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
              />

              <View style={{ paddingHorizontal: 20 }}>
                <ColorPickerComponent
                  setSelectedColorCat={setSelectedColorCat}
                />
              </View>
            </View>
          </View>

          <ActionButton
            title={buttonConfig?.label}
            onPress={isEditMode ? updateCategory : createCategory}
            type={BtnType.UPDATE}
          />
        </View>

        <Toast message="" visible={false} />

        {!loading && (
          <BottomSheetComponent ref={bottomSheetRef}>
            <AllCategoriesIcon
              ref={bottomSheetRef}
              setSelectedCategory={setSelectedCategory}
            />
          </BottomSheetComponent>
        )}
      </SafeAreaView>
    </View>
  );
};

export default CreateCategorySheet;
