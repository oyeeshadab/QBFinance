import { AppTheme } from '@theme/themes';
import { StyleSheet } from 'react-native';
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
    },
    placeholder: {
      width: 32,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 30,
    },
    avatarContainer: {
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#3B82F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 18,
      color: '#FFFFFF',
    },
    editIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#3B82F6',
      borderRadius: 20,
      padding: 8,
    },
    userName: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      marginBottom: 16,
    },
    editProfileButton: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
    },
    editProfileText: {
      fontSize: 14,
      color: '#3B82F6',
      fontWeight: '500',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
      gap: 12,
    },
    statCard: {
      flex: 1,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    statLabel: {
      fontSize: 12,
      marginTop: 8,
      marginBottom: 4,
    },
    statValue: {
      fontSize: 18,
      fontWeight: '600',
    },
    menuSection: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
    },
    menuLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    menuTitle: {
      fontSize: 16,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginTop: 30,
      marginHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.delete,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.delete,
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.colors.buttonDisabled,
      marginTop: 20,
      marginBottom: 10,
    },
  });
