import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import { View, Text } from 'react-native';
import FinanceTracker from '@screens/Secret/FinanceTracker/Home/FinanceTracker';

const Tab = createBottomTabNavigator();

const Screen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
);

export default function BottomTabs() {
  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen name="FinanceHome" component={FinanceTracker} />

      <Tab.Screen name="Stats">{() => <Screen title="Stats" />}</Tab.Screen>

      <Tab.Screen name="Chat">{() => <Screen title="Chat" />}</Tab.Screen>

      <Tab.Screen name="Settings">
        {() => <Screen title="Settings" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
