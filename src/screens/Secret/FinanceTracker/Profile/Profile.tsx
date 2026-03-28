import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
  Image,
  Alert,
  useColorScheme,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import BlurView from '@sbaiahmed1/react-native-blur';
import { useStyle } from './styles';
import { useTheme } from '@theme/ThemeProvider';
import Text from '@components/Text/Text';

interface ProfilePageProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userName = 'Shadab',
  userEmail = 'shadab@example.com',
  userAvatar,
}) => {
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [notifications, setNotifications] = useState(true);
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const menuItems = [
    {
      id: '1',
      icon: 'person-outline',
      title: 'Personal Information',
      onPress: () => Alert.alert('Coming Soon', 'Personal Information'),
    },
    {
      id: '2',
      icon: 'card-outline',
      title: 'Payment Methods',
      onPress: () => Alert.alert('Coming Soon', 'Payment Methods'),
    },
    {
      id: '3',
      icon: 'trending-up-outline',
      title: 'Statistics',
      onPress: () => Alert.alert('Coming Soon', 'Statistics'),
    },
    {
      id: '4',
      icon: 'notifications-outline',
      title: 'Notifications',
      isSwitch: true,
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      id: '5',
      icon: 'moon-outline',
      title: 'Dark Mode',
      isSwitch: true,
      value: isDarkMode,
      onValueChange: setIsDarkMode,
    },
    {
      id: '6',
      icon: 'lock-closed-outline',
      title: 'Privacy & Security',
      onPress: () => Alert.alert('Coming Soon', 'Privacy & Security'),
    },
    {
      id: '7',
      icon: 'help-circle-outline',
      title: 'Help & Support',
      onPress: () => Alert.alert('Coming Soon', 'Help & Support'),
    },
    {
      id: '8',
      icon: 'information-circle-outline',
      title: 'About',
      onPress: () => Alert.alert('About', 'Finance Tracker v1.0.0'),
    },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Logged Out', 'You have been logged out successfully');
        },
      },
    ]);
  };

  return (
    <FinanceTrackerWrapper useSafeArea bubble padding blob>
      <Header backButton noPadding />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Info */}
        <NeumorphicContainer>
          <View style={styles.profileSection}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <View style={styles.avatarContainer}>
              {userAvatar ? (
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {userName[0].toUpperCase()}
                  </Text>
                </View>
              )}
              <Pressable
                style={({ pressed }) => [
                  styles.editIcon,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <Icon
                  name="camera-outline"
                  size={20}
                  color={theme.colors.white}
                />
              </Pressable>
            </View>
            <Text color={theme.colors.white} style={styles.userName}>
              {userName}
            </Text>
            <Text color={theme.colors.white} style={styles.userEmail}>
              {userEmail}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.editProfileButton,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </Pressable>
          </View>
        </NeumorphicContainer>

        {/* Stats Cards */}
        {/* <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="wallet-outline" size={24} color="#3B82F6" />
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>₹ 45,230</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="trending-up-outline" size={24} color="#10B981" />
            <Text style={styles.statLabel}>Total Income</Text>
            <Text style={styles.statValue}>₹ 1,35,000</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="calendar-outline" size={24} color="#F59E0B" />
            <Text style={styles.statLabel}>Member Since</Text>
            <Text style={styles.statValue}>Mar 2025</Text>
          </View>
        </View> */}

        {/* Menu Items */}
        <NeumorphicContainer>
          <View style={styles.menuSection}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <Text color={theme.colors.white} style={styles.sectionTitle}>
              Settings
            </Text>
            {menuItems.map(item => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.menuItem,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={item.onPress}
                disabled={item.isSwitch}
              >
                <View style={styles.menuLeft}>
                  <Icon name={item.icon} size={22} color={theme.colors.white} />
                  <Text color={theme.colors.white} style={styles.menuTitle}>
                    {item.title}
                  </Text>
                </View>
                {item.isSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{
                      false: '#374151',
                      true: '#3B82F6',
                    }}
                    thumbColor="#FFFFFF"
                  />
                ) : (
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={theme.colors.white}
                  />
                )}
              </Pressable>
            ))}
          </View>
        </NeumorphicContainer>

        {/* Logout Button */}
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={22} color={theme.colors.delete} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        {/* Version Info */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </FinanceTrackerWrapper>
  );
};

export default ProfilePage;
