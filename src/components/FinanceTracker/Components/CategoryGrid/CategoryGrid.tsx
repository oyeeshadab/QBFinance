import React, { useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/Text/Text';
import { CategoryIcon } from '../CategoryIconComponent';
import { useCategoryGrid } from './useCategoryGrid';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import { CreateCategorySheet } from './CreateCategorySheet';
import BottomSheetComponent from '@components/BottomSheet/BottomSheetComponent';
// import { useNavigation } from '@react-navigation/native';

export interface CategoryItem {
  id: number;
  icon: string;
  iconLibrary?: string;
  name: string;
  color: string;
}

interface Props {
  // categories: CategoryItem[];
  onSelect: (item: CategoryItem, event: GestureResponderEvent) => void;
  navigation: any;
}

export const CategoryGrid = React.memo(({ onSelect, navigation }: Props) => {
  const { data, loading, keyExtractor, refreshCategories } = useCategoryGrid();
  const renderItem = useCallback(
    ({ item }: { item: CategoryItem }) => {
      console.log('🚀 ~ item:', item?.id);
      return (
        <View style={styles.itemWrapper}>
          <TouchableOpacity
            activeOpacity={0.6}
            // onPress={handleCreateNew}
            onPress={e =>
              item?.id === -1 ? handleCreateNew() : onSelect(item, e)
            }
            style={[styles.colorItem, { backgroundColor: item.color }]}
          >
            <CategoryIcon icon_name={item.icon} />
          </TouchableOpacity>

          <Text style={styles.label} numberOfLines={1} color={'#ffffff'}>
            {item.name}
          </Text>
        </View>
      );
    },
    [onSelect],
  );

  const handleCreateNew = () => {
    // sheetRef.current?.open();
    // console.log('🚀 ~ handleCreateNew ~ sheetRef:', sheetRef);
    navigation.navigate('CreateCategorySheet');
  };

  const handleCreateCategory = async category => {
    // await CategoriesRepo.createCategory(category);
    // refreshCategories(); // from your hook
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          numColumns={5}
          scrollEnabled={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.loaderWrapper}>
          <LottieView
            source={require('@assets/JSON/Loading2.json')}
            style={styles.LottieIcon}
            autoPlay
            loop
          />
        </View>
      )}
      {/* <BottomSheetComponent ref={sheetRef}>
        <CreateCategorySheet
          sheetRef={sheetRef}
          onCreate={handleCreateCategory}
        />
      </BottomSheetComponent> */}
    </View>
  );
});
