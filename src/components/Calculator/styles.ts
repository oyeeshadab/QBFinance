import { StyleSheet } from 'react-native';
export const useStyle = () =>
  StyleSheet.create({
    bottomSection: {
      flex: 0.7,
      padding: 20,
    },

    button: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },

    displayContainer: {
      marginVertical: 10,
    },
    result: {
      textAlign: 'right',
    },
    keypad: {
      borderRadius: 10,
      padding: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    key: {
      width: '25%',
      paddingVertical: 20,
      alignItems: 'center',
    },
    keyText: {
      color: 'white',
    },

    gradientContainer: {
      height: '100%',
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });
