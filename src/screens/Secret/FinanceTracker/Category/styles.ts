import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const CIRCLE_SIZE = 60;
export const ITEM_SIZE = width / 7;

export const useStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },

    gradient: {
      ...StyleSheet.absoluteFill,
      zIndex: 0,
    },

    content: {
      flex: 1,
      zIndex: 2,
    },

    scrollViewContent: {
      paddingBottom: 140,
    },

    amountCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 7,
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: 10,
      margin: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
      height: 100,
    },

    amount: { color: '#FFF' },

    todayRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
    },

    today: {
      color: '#D8E1E8',
      fontSize: 20,
      fontWeight: '600',
    },

    timeBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    time: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      color: '#FFF',
      padding: 8,
      borderRadius: 6,
      marginHorizontal: 4,
      minWidth: 40,
      textAlign: 'center',
    },

    timeColon: {
      color: '#FFF',
      marginHorizontal: 4,
      fontSize: 18,
    },

    pm: {
      color: '#FFF',
      marginLeft: 6,
    },

    input: {
      backgroundColor: 'rgba(255,255,255,0.12)',
      //   marginHorizontal: 20,
      //   marginTop: 16,
      borderRadius: 14,
      padding: 16,
      color: '#FFF',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
      width: Dimensions.get('window').width / 1.5,
    },

    attachment: {
      marginHorizontal: 20,
      marginTop: 16,
      borderRadius: 14,
      backgroundColor: 'rgba(255,255,255,0.12)',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },

    attachmentText: {
      color: '#D8E1E8',
    },

    plus: {
      color: '#FFF',
      fontSize: 22,
    },

    revealCircle: {
      position: 'absolute',
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      overflow: 'hidden',
      zIndex: 1,
    },

    buttonContainer: {
      height: 50,
      width: Dimensions.get('window').width - 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 15,
      alignSelf: 'center',
      bottom: 15,
    },
    moreBtn: {
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
    },
    moreText: { color: '#D8E1E8' },
    pills: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
    pill: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    activePill: { backgroundColor: 'rgba(255,255,255,0.2)' },

    itemWrapper: {
      alignItems: 'center',
      marginVertical: 6,
    },
    loaderWrapper: {
      alignItems: 'center',
      marginVertical: 6,
      height: 190,
      justifyContent: 'center',
    },

    colorItem: {
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    },

    //   container: {
    //   flex: 1,
    //   backgroundColor: '#f5f7fa',
    // },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 28,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#ffffff',
      letterSpacing: 0.5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      marginTop: 6,
    },

    // Add Button
    addButton: {
      flexDirection: 'row',
      // backgroundColor: '#ffffff',
      // marginHorizontal: 16,
      // marginTop: 20,
      // marginBottom: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.08,
      // shadowRadius: 8,
      // elevation: 3,
      gap: 8,
    },
    addButtonIcon: {
      fontSize: 22,
      fontWeight: '600',
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },

    // List Content
    listContent: {
      paddingBottom: 110,
    },

    flatListContainer: {
      height: '100%',
    },

    // Category Item
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: '#ffffff',
      // borderRadius: 18,
      padding: 14,

      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 0.05,
      // shadowRadius: 4,
      // elevation: 2,
    },
    categoryIconContainer: {
      width: 54,
      height: 54,
      borderRadius: 27,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    categoryIcon: {
      fontSize: 28,
    },
    categoryInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    categoryName: {
      fontSize: 17,
      fontWeight: '600',
    },
    transactionCount: {
      fontSize: 12,
      fontWeight: '600',
    },
    colorDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    categoryActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
    },
    editButton: {
      backgroundColor: '#E3F2FD',
    },
    deleteButton: {
      backgroundColor: '#FFEBEE',
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },

    // Empty State
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyEmoji: {
      fontSize: 64,
      marginBottom: 16,
      opacity: 0.6,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#7f8c8d',
    },
    emptySubtext: {
      fontSize: 14,
      color: '#bdc3c7',
      marginTop: 8,
    },

    // Loading State
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f7fa',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 14,
      color: '#7f8c8d',
    },

    // Modal Overlay
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: 28,
      width: '90%',
      maxHeight: '85%',
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#1a1a2e',
    },
    modalClose: {
      fontSize: 24,
      color: '#999',
      padding: 4,
    },

    // Form Inputs
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: '#2c3e50',
      marginTop: 16,
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: '#fafafa',
    },

    // Icon Selection
    iconScroll: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    iconOption: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      marginBottom: 8,
    },
    iconOptionSelected: {
      backgroundColor: '#1a1a2e',
      borderWidth: 2,
      borderColor: '#FFD700',
    },
    iconOptionText: {
      fontSize: 28,
    },

    // Color Selection
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 8,
    },
    colorOption: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    colorOptionSelected: {
      borderColor: '#1a1a2e',
      transform: [{ scale: 1.05 }],
    },

    // Preview
    previewContainer: {
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
    },
    previewLabel: {
      fontSize: 12,
      color: '#7f8c8d',
      marginBottom: 8,
    },
    previewCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 30,
      gap: 10,
    },
    previewIcon: {
      fontSize: 28,
    },
    previewName: {
      fontSize: 18,
      fontWeight: '600',
    },

    // Modal Actions
    modalActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
      marginBottom: 12,
    },
    modalActionBtn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
    },
    cancelModalBtn: {
      backgroundColor: '#f0f0f0',
    },
    cancelModalBtnText: {
      color: '#7f8c8d',
      fontWeight: '600',
    },
    saveModalBtn: {
      backgroundColor: '#1a1a2e',
    },
    saveModalBtnText: {
      color: '#ffffff',
      fontWeight: '600',
    },

    // Delete Confirmation Modal
    confirmModal: {
      backgroundColor: '#ffffff',
      borderRadius: 28,
      width: '80%',
      padding: 24,
      alignItems: 'center',
    },
    confirmEmoji: {
      fontSize: 48,
      marginBottom: 12,
    },
    confirmTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#1a1a2e',
      marginBottom: 12,
    },
    confirmMessage: {
      fontSize: 16,
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: 8,
    },
    confirmWarning: {
      fontSize: 13,
      color: '#F44336',
      textAlign: 'center',
      marginBottom: 20,
    },
    confirmButtons: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
    },
    confirmBtn: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 30,
      alignItems: 'center',
    },
    cancelConfirmBtn: {
      backgroundColor: '#f0f0f0',
    },
    cancelConfirmText: {
      color: '#7f8c8d',
      fontWeight: '600',
    },
    deleteConfirmBtn: {
      backgroundColor: '#F44336',
    },
    deleteConfirmText: {
      color: '#ffffff',
      fontWeight: '600',
    },
    lottie: {
      height: 500,
      width: 500,
      alignSelf: 'center',
      marginTop: 50,
    },
  });
