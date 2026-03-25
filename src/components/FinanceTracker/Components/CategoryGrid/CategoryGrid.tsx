import React, { useCallback } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/Text/Text';
import { CategoryIcon } from '../CategoryIconComponent';
import { useCategoryGrid } from './useCategoryGrid';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface CategoryItem {
  id: number;
  icon: string;
  iconLibrary?: string;
  name: string;
  color: string;
}

interface Props {
  onSelect: (item: CategoryItem, event: GestureResponderEvent) => void;
  navigation: any;
  currentGradient?: string[];
  ref?: React.RefObject<any>;
}

export const CategoryGrid = React.memo(
  React.forwardRef<any, Props>(
    ({ onSelect, navigation, currentGradient }, ref) => {
      const { data, loading, keyExtractor } = useCategoryGrid(navigation);

      const handleCreateNew = () => {
        handleBottomSheet();
        navigation.navigate('CreateCategorySheet');
      };

      const handleSelectCategory = (
        item: CategoryItem,
        e: GestureResponderEvent,
      ) => {
        handleBottomSheet();
        onSelect(item, e);
      };

      const handleBottomSheet = async () => {
        if (ref && 'current' in ref && ref.current) {
          ref.current?.close();
        }
      };

      const renderItem = useCallback(
        ({ item }: { item: CategoryItem }) => {
          return (
            <View style={styles.itemWrapper}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={e =>
                  item?.id === -1
                    ? handleCreateNew()
                    : handleSelectCategory(item, e)
                }
                style={[styles.colorItem, { backgroundColor: item.color }]}
              >
                <CategoryIcon size={35} icon_name={item.icon} />
              </TouchableOpacity>
              <Text style={styles.label} numberOfLines={1} color={'#ffffff'}>
                {item.name}
              </Text>
            </View>
          );
        },
        [onSelect],
      );

      return (
        <>
          <View style={[styles.gradientContainer]}>
            <Text
              weight={'deliusR'}
              color={'#fff'}
              variant="h3"
              style={styles.categoryHeading}
            >
              Select Category
            </Text>
            <View style={styles.contentContainer}>
              {!loading ? (
                <FlatList
                  data={data}
                  keyExtractor={keyExtractor}
                  numColumns={5}
                  scrollEnabled={false}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
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
            </View>
          </View>
        </>
      );
    },
  ),
);
