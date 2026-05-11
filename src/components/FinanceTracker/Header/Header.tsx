import { View, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';
import Text from '@components/Text/Text';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { UserRepo } from '@database/repository/user.repo';
import { User } from '@database/types';

interface Props {
  backButton: boolean;
  deleteButton: boolean;
  showProfile: boolean;
  welcomeText: boolean;
  noPadding: boolean;
  deleteFun: () => void;
  title: string;
}
const Header = ({
  backButton,
  deleteButton,
  showProfile = false,
  welcomeText = false,
  noPadding = false,
  title,
  deleteFun,
}: Partial<Props>) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);

  UserRepo.getCurrentLoggedInUser().then(userVal => {
    setUser(userVal);
  });

  return (
    <View style={styles.container}>
      {title && (
        <Text color={theme.colors.white} weight="deliusR" variant="h3">
          {title}
        </Text>
      )}
      {backButton && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [
            !noPadding && styles.buttons,
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
            {user?.name}
          </Text>
        </View>
      )}
      {showProfile && (
        <View style={styles.profileContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.profileImageContainer}
            onPress={() => {
              navigation.navigate('AppNavigator', {
                screen: 'Profile',
              });
            }}
          >
            <Text style={{ color: 'white' }}>
              {user?.name[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
