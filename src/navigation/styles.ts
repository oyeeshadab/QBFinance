import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const CONTAINER_WIDTH = width * 0.9;
const TAB_COUNT = 5;
const TAB_WIDTH = CONTAINER_WIDTH / TAB_COUNT;

const INDICATOR_SIZE = 55;

export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 30,
      width,
      alignItems: 'center',
    },

    wrapper: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primaryBackground,
      width: CONTAINER_WIDTH,
      height: 70,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    tab: {
      width: TAB_WIDTH,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },

    indicator: {
      position: 'absolute',
      width: INDICATOR_SIZE,
      height: INDICATOR_SIZE,
      borderRadius: INDICATOR_SIZE / 2,
      backgroundColor: theme.colors.white,
      top: (70 - INDICATOR_SIZE) / 2,
    },

    centerButtonContainer: {
      width: TAB_WIDTH,
      height: TAB_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -40,
    },
    centerButton: {
      width: '90%',
      height: '90%',
      borderRadius: TAB_WIDTH / 2,
      backgroundColor: theme.colors.delete,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
