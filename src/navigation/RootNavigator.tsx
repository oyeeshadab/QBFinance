import React, { useState } from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigator, AppStackParamList } from './AppNavigator';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { BiometricGate } from '../security/BiometricGate';
import BottomTabs from './BottomTabs';
import { UserRepo } from '@database/repository/user.repo';

export type RootStackParamList = {
  Login: undefined;
  OtpVerification: { email: string };
  Home: undefined;
  Welcome: undefined;
  SecretNavigator: undefined;
  AppNavigator: NavigatorScreenParams<AppStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [isSecretLoggedIn, setIsSecretLoggedIn] = useState<boolean | null>(
    null,
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  UserRepo.getCurrentLoggedInUser()
    .then(user => {
      if (user?.hasOwnProperty('email')) {
        setIsUserLoggedIn(true);
        if (user?.isFingerprintEnable) {
          setIsSecretLoggedIn(true);
        }
      } else {
        setIsUserLoggedIn(false);
      }
      console.log('getCurrentLoggedInUsergetCurrentLoggedInUser', user);
    })
    .catch(err => {
      console.error('Error fetching current logged in user:', err);
    });

  if (isUserLoggedIn === null) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/JSON/LoaderCat.json')}
          style={styles.LottieIcon}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          isUserLoggedIn || isSecretLoggedIn
            ? 'SecretNavigator'
            : 'AppNavigator'
        }
      >
        <Stack.Screen name="SecretNavigator">
          {() =>
            isSecretLoggedIn ? (
              <BiometricGate>
                <BottomTabs />
              </BiometricGate>
            ) : (
              <BottomTabs />
            )
          }
        </Stack.Screen>
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E2D4',
  },
  LottieIcon: {
    width: 400,
    height: 400,
  },
});
