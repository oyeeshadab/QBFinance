import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import FinanceTracker from '@screens/Secret/FinanceTracker/Home/FinanceTracker';
import TransactionMessagesList from '@screens/Secret/FinanceTracker/TransactionManager/TransactionMessagesList';
import SettingsScreen from '@screens/Secret/FinanceTracker/Settings/Settings';
import StatsScreen from '@screens/Secret/FinanceTracker/Stats/Stats';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomTabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen name="FinanceHome" component={FinanceTracker} />

      <Tab.Screen name="Stats" component={StatsScreen} />

      <Tab.Screen name="TransMessage" component={TransactionMessagesList} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
