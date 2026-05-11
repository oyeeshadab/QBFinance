import React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useStyle } from './styles';
import { useWelcomeAnimation } from './useWelcomeAnimation';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from '../../theme/ThemeProvider';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Text from '@components/Text/Text';

const WelcomeScreen = () => {
  const {
    name,
    email,
    loading,
    setName,
    handleEmailChange,
    handleAuth,
    error,

    setTitlePressed,
  } = useWelcomeAnimation();

  const { theme } = useTheme();
  const styles = useStyle(theme);

  return (
    <FinanceTrackerWrapper useSafeArea bubble>
      <View style={[styles.container]}>
        <View style={[styles.content]}>
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={() => {
              ReactNativeHapticFeedback.trigger('notificationError');
              setTitlePressed(true);
            }}
            delayLongPress={3000}
          >
            <Text variant="h1" color={theme.colors.primary}>
              Welcome
            </Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            A calm, secure and delightful start
            {'\n'}to your authentication journey.
          </Text>

          <TextInput
            value={name}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={e => setName(e)}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              onChangeText={e => handleEmailChange(e)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error && (
              <Text color="red" variant="body" style={styles.errorText}>
                {error}
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleAuth}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Get In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </FinanceTrackerWrapper>
  );
};

export default WelcomeScreen;
