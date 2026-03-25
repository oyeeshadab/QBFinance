import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: 170,
      justifyContent: 'space-between',
      padding: 20,
    },
    balanceLabel: { color: theme.colors.white, opacity: 0.8 },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    expeseIncomRow: { flexDirection: 'row', justifyContent: 'space-between' },

    txRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    titleContainer: {
      flex: 1,
    },
    txIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    actionButton: {
      alignItems: 'center',
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: theme.colors.delete,
    },
    actionButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionText: { fontSize: 16 },
    buttonContainer: {
      height: 45,
      width: Dimensions.get('window').width - 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 15,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 10,
    },
  });
