import React, { useEffect, useState } from 'react';
import Text from '@components/Text/Text';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransaction } from '@screens/Secret/FinanceTracker/Transactions/useTransaction';
// import { useTransaction } from './useTransaction';
// import { useStyle } from './styles';
import { CategoryIcon } from '@components/FinanceTracker/Components/CategoryIconComponent';
import { Toast } from '@components/Toast/Toast';
import BottomSheetComponent from '@components/BottomSheet/BottomSheetComponent';
import { AmountCalculator } from '@components/Calculator/Calulator';
import { TransactionTypeToggle } from '@components/TransactionTypeToggle/TransactionTypeToggle';
import { CategoryGrid } from '@components/FinanceTracker/Components/CategoryGrid/CategoryGrid';
import { darkenHex, lightenHex } from '@utils/color';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/AppNavigator';
import ActionButton from '@components/FinanceTracker/Components/ActionButton';
import { BtnType } from '@app-types/index';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';
import * as Icons from '@assets/SVG';
import { AllCategoriesIcon } from '@components/FinanceTracker/Components/CategoryGrid/AllCategories';
import { useCreateCategory } from './useCreateCategory';
import ColorPickerComponent from '@components/ColorPicker/ColorPicker';
type AddTransactionRouteProp = RouteProp<RootStackParamList, 'AddTransaction'>;

type Props = {
  route: AddTransactionRouteProp;
};
// const CreateCategorySheet: React.FC<Props> = ({ route }) => {
export const CreateCategorySheet = ({ route }) => {
  const { item } = route?.params || {};
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const {
    title,

    titleRef,
    setTitle,
    showToast,
    toastMessage,
    selectedColor,
    bottomSheetRef,
    currentGradient,
    // selectedCategory,
    navigation,
  } = useTransaction();
  const {
    type,
    setType,
    colors,
    categoryNameRef,
    categoryName,
    setCategoryName,
    buttonConfig,
    selectedColorCat,
    setSelectedColorCat,
    createCategory,
    selectedCategory,
    setSelectedCategory,
  } = useCreateCategory();
  const { theme } = useTheme();
  const styles = useStyle(theme);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={currentGradient}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
          <View style={styles.content}>
            <View style={styles.scrollViewContent}>
              <TransactionTypeToggle
                selectedColor={selectedColor}
                type={type}
                setType={setType}
              />

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
                    <CategoryIcon icon_name={selectedCategory} />
                  </TouchableOpacity>
                </View>
                <TextInput
                  ref={categoryNameRef}
                  value={categoryName}
                  style={styles.input}
                  placeholder="Category Name"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  onChangeText={e => setCategoryName(e)}
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
                    onPress={() => {
                      setSelectedColorCat(item);
                    }}
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
            onPress={createCategory}
            type={BtnType.CREATE}
          />
        </View>

        <Toast message={toastMessage} visible={showToast} />

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
