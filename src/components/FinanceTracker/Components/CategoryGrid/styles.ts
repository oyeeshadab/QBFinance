import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ITEM_SIZE = width / 7;

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(0,0,0,0.5)',
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

    // borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  listContent: {
    // alignItems: 'center',
    paddingBottom: 20,
  },
  itemWrapper: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 12,
    width: 60,
  },
  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    width: 70,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  LottieIcon: {
    width: 100,
    height: 100,
  },
  categoryHeading: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
