import React, { useEffect } from 'react';
import { Button, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import {
  getFcmToken,
  registerForegroundHandler,
  requestNotificationPermission,
} from './src/utils/notification';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';
const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    registerForegroundHandler();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <AppNavigator />
    </>
  );
};

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
    getFcmToken();
  }, []);
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
