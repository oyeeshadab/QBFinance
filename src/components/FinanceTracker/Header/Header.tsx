import { View, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';
import Text from '@components/Text/Text';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  backButton: boolean;
  deleteButton: boolean;
  showProfile: boolean;
  welcomeText: boolean;
  deleteFun: () => void;
}
const Header = ({
  backButton,
  deleteButton,
  showProfile = false,
  welcomeText = false,
  deleteFun,
}: Partial<Props>) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {backButton && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [
            styles.buttons,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </Pressable>
      )}
      {deleteButton && (
        <Pressable
          onPress={deleteFun}
          style={({ pressed }) => [
            styles.buttons,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <MaterialIcons name="delete" size={24} color="#FF6666" />
        </Pressable>
      )}
      {welcomeText && (
        <View>
          <Text color="#fff" weight="deliusR" variant="h3">
            Welcome Back
          </Text>
          <Text color="#fff" weight="deliusR" variant="title">
            Shadab
          </Text>
        </View>
      )}
      {showProfile && (
        <View style={styles.profileContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.profileImageContainer}
          >
            <Text style={{ color: 'white' }}>SH</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
