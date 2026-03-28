import React, { memo } from 'react';
import { View, Pressable, Animated, Platform, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import BlurView from '@sbaiahmed1/react-native-blur';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import Text from '@components/Text/Text';
import { styles } from './styles';
import { useTransactionMessages } from './useTransactionMessages';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@theme/ThemeProvider';

const TransactionMessageItem = ({ item, handleDelete }: any) => {
  const { extractAmountFromMessageBody, handleAdd } = useTransactionMessages();
  const { theme } = useTheme();

  const renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={() => handleAdd(item)}
            style={[styles.actionButton, styles.addButton]}
          >
            <MaterialIcons
              name="currency-rupee"
              size={24}
              color={theme.colors.white}
            />
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={() => handleDelete(item)}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <MaterialIcons name="delete" size={24} color={theme.colors.white} />
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <NeumorphicContainer>
      <Swipeable renderRightActions={renderRightActions}>
        <BlurView
          blurType="regular"
          blurAmount={Platform.OS === 'ios' ? 25 : 5}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.card}>
          <Text style={styles.amountText}>
            {extractAmountFromMessageBody(item.body) ?? 'No Amount'}
          </Text>

          <Text color="white" numberOfLines={2}>
            {item.body}
          </Text>

          <Text style={styles.dateText}>
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      </Swipeable>
    </NeumorphicContainer>
  );
};

export default memo(TransactionMessageItem);
