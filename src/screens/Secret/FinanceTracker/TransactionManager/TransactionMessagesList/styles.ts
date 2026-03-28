import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    padding: 16,
    borderRadius: 8,
  },

  amountText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },

  dateText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingLeft: 10,
  },

  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '90%',
    borderRadius: 5,
  },

  addButton: {
    backgroundColor: '#22c55e',
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 10,
  },

  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainerStyle: { paddingBottom: 160 },
  lottie: {
    height: 500,
    width: 500,
    alignSelf: 'center',
    marginTop: 50,
  },
});
