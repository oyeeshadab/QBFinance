import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';

const { width } = Dimensions.get('window');

const CONTAINER_WIDTH = width * 0.9;
const TAB_WIDTH = CONTAINER_WIDTH / 5;
const INDICATOR_SIZE = 55;

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const translateX = useSharedValue(0);

  /** navigation index → visual slot index (skip center) */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabPositions = [0, 1, 3, 4];

  useEffect(() => {
    const position = tabPositions[state.index];

    translateX.value = withSpring(position * TAB_WIDTH, {
      damping: 150,
      stiffness: 550,
    });
  }, [state.index, tabPositions, translateX]);

  const animatedIndicator = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderIcon = (name: string, focused: boolean) => {
    const size = 22;
    const color = focused ? '#000' : '#fff';

    switch (name) {
      case 'FinanceHome':
        return <Ionicons name="grid-outline" size={size} color={color} />;

      case 'Stats':
        return <Feather name="bar-chart-2" size={size} color={color} />;

      case 'TransMessage':
        return <Ionicons name="chatbubble-outline" size={size} color={color} />;

      default:
        return <Ionicons name="settings-outline" size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              left: (TAB_WIDTH - INDICATOR_SIZE) / 2,
            },
            animatedIndicator,
          ]}
        />

        {/* First two tabs */}
        {state.routes.slice(0, 2).map((route, index) => {
          const focused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(route.name)}
            >
              {renderIcon(route.name, focused)}
            </TouchableOpacity>
          );
        })}

        {/* Center Button */}
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity
            style={styles.centerButton}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('AppNavigator', {
                screen: 'AddTransaction',
              });
            }}
          >
            <Entypo name="plus" size={28} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        {/* Last two tabs */}
        {state.routes.slice(2).map((route, index) => {
          const actualIndex = index + 2;
          const focused = state.index === actualIndex;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(route.name)}
            >
              {renderIcon(route.name, focused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
