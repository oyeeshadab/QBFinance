import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  // withSpring,
} from 'react-native-reanimated';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import Text from '@components/Text/Text';
import { RenderIcon } from '@utils/iconHelpers';
import { ActionButtonProps } from '@app-types/index';

const ActionButton = ({ title, icon, onPress, type }: ActionButtonProps) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        // onPressIn={() => (scale.value = withSpring(0.9))}
        // onPressOut={() => (scale.value = withSpring(1))}
        // style={styles.profileRow}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            animatedStyle,
            type === 'delete' && styles.deleteButton,
          ]}
        >
          <View style={styles.actionButtonContainer}>
            {icon && (
              <RenderIcon
                library={icon?.library}
                name={icon?.name}
                color={theme.colors.black}
              />
            )}
            <Text
              color={
                type === 'delete' ? theme.colors.white : theme.colors.black
              }
              style={styles.actionText}
            >
              {title}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
      {/* <Pressable
      onPressIn={() => (scale.value = withSpring(0.9))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={[animatedStyle, { backgroundColor: 'red' }]}>
        <Text style={{}}>{icon}</Text>
        <Text style={{}}>{title}</Text>
      </Animated.View>
    </Pressable> */}
    </>
  );
};

export default ActionButton;
