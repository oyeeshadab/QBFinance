import { Pressable, View } from 'react-native';
import React, { useCallback } from 'react';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import { Transaction } from '@database/types';
import Text from '@components/Text/Text';
import { useFinanceTracker } from '@hooks/useFinanceTracker';
import { CategoryIcon, IconName } from './CategoryIconComponent';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootNavigator';

interface Props {
  item: Transaction;
  index: number;
}
type NavigationProps = NavigationProp<RootStackParamList>;

const TransactionList = ({ item }: Props) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const navigation = useNavigation<NavigationProps>();

  const { formatCurrency } = useFinanceTracker();

  const formattedBalance = formatCurrency(item?.amount);
  const handleOpen = useCallback(() => {
    navigation.navigate('AppNavigator', {
      screen: 'AddTransaction',
      params: { item },
    });
  }, [item, navigation]);
  return (
    <Pressable
      style={({ pressed }) => [styles.txRow, { opacity: pressed ? 0.5 : 1 }]}
      onPress={handleOpen}
    >
      <View style={[styles.txIcon, { backgroundColor: item?.category_color }]}>
        <CategoryIcon
          icon_name={(item?.category_icon || 'Default') as IconName}
          size={25}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text variant="title" color={theme.colors.white} numberOfLines={1}>
          {item?.title ? item?.title : item?.category_name}
        </Text>
        <Text variant="caption" color={theme.colors.white}>
          {item?.category_name}
        </Text>
      </View>

      <Text
        color={item?.type === 'expense' ? theme.colors.red : theme.colors.green}
      >
        {formattedBalance.text}
      </Text>
    </Pressable>
  );
};

export default TransactionList;
