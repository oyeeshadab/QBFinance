import { View, FlatList, Platform, StyleSheet, Pressable } from 'react-native';
import { useCategoryList } from './useCategoryList';
import { useStyle } from './styles';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import BlurView from '@sbaiahmed1/react-native-blur';
import Text from '@components/Text/Text';
import { useTheme } from '@theme/ThemeProvider';
import LottieView from 'lottie-react-native';
import {
  CategoryIcon,
  IconName,
} from '@components/FinanceTracker/Components/CategoryIconComponent';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from '@components/FloatingButton/FloatingButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/AppNavigator';
import { Category } from '@database/types';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export default function CategoryManager() {
  const { categories, deleteCategory } = useCategoryList();

  const { theme } = useTheme();
  const styles = useStyle();
  const navigation = useNavigation<NavigationProp>();

  // Category Handlers
  const createCategory = (item?: Category) => {
    console.log('🚀 ~ createCategory ~ item:', item);
    navigation.navigate('CreateCategorySheet', {
      item: item ?? null,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
  };

  // Render Helpers
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <NeumorphicContainer>
      <Pressable
        style={styles.categoryItem}
        onPress={() => createCategory(item)}
      >
        {/* <BlurView
          blurType="regular"
          blurAmount={Platform.OS === 'ios' ? 25 : 5}
          style={[StyleSheet.absoluteFill]}
        /> */}

        <View
          style={[
            styles.categoryIconContainer,
            { backgroundColor: item.color },
          ]}
        >
          <CategoryIcon size={35} icon_name={item?.icon as IconName} />
        </View>

        <View style={styles.categoryInfo}>
          <View>
            <Text style={styles.categoryName} color={theme.colors.white}>
              {item.name}
            </Text>
            <Text style={styles.transactionCount} color={theme.colors.white}>
              {item?.transactionCount} Transactions
            </Text>
          </View>
        </View>

        <View style={styles.categoryActions}>
          <Pressable
            onPress={() => handleDelete(item.id!)}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <MaterialIcons name="delete" size={24} color="#FF6666" />
          </Pressable>
        </View>
      </Pressable>
    </NeumorphicContainer>
  );

  const renderEmptyList = () => (
    <LottieView
      source={require('@assets/JSON/notFound.json')}
      autoPlay
      loop
      style={styles.lottie}
    />
  );

  return (
    <FinanceTrackerWrapper
      useSafeArea
      bubble
      padding
      blob={categories.length > 0 || false}
    >
      <Header backButton noPadding />

      <FlatList
        // data={categories}
        data={categories as any}
        keyExtractor={item => item.id?.toString() || item.name}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContent}
        style={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />

      <FloatingButton onPress={createCategory} />
    </FinanceTrackerWrapper>
  );
}
