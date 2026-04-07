import { AppTheme } from '@theme/themes';
import { Dimensions, StyleSheet } from 'react-native';
export const useStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: { paddingBottom: Dimensions.get('window').height / 5 },
    periodContainer: {
      flexDirection: 'row',
      paddingVertical: 16,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 8,
      marginHorizontal: 10,
    },
    periodButtonActive: {
      backgroundColor: '#3B82F6',
    },
    tabContainer: {
      flexDirection: 'row',
      // backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 12,
      gap: 12,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#F3F4F6',
    },
    tabButtonActive: {
      backgroundColor: '#3B82F6',
    },
    tabText: {
      fontSize: 15,
      fontWeight: '500',
      color: 'black',
    },
    tabTextActive: {
      color: '#FFFFFF',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    statCard: {
      padding: 12,
      alignItems: 'center',
      width: 110,
    },
    statLabel: {
      fontSize: 12,
      marginBottom: 4,
    },
    statValue: {
      fontSize: 18,
      fontWeight: '600',
    },
    breakdownCard: {
      padding: 16,
      borderRadius: 16,
    },
    breakdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    breakdownTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    viewAllText: {
      fontSize: 13,
      color: '#3B82F6',
      fontWeight: '500',
    },
    pieChartContainer: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    breakdownList: {
      marginTop: 8,
    },
    breakdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 0.2,
      borderBottomColor: '#F3F4F6',
    },
    breakdownItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    colorDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    breakdownItemName: {
      fontSize: 14,
    },
    breakdownItemAmount: {
      fontSize: 14,
      fontWeight: '500',
    },
    summaryCard: {
      padding: 16,
      borderRadius: 16,
    },
    summaryTitle: {
      fontSize: 16,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryItem: {
      flex: 1,
      alignItems: 'center',
    },
    summaryDivider: {
      width: 1,
      height: 40,
      backgroundColor: '#F3F4F6',
    },
    summaryLabel: {
      fontSize: 12,
      marginBottom: 4,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '600',
    },
    incomeColor: {
      color: '#10B981',
    },
    expenseColor: {
      color: '#EF4444',
    },
    savingsColor: {
      color: '#3B82F6',
    },
    topCategoriesCard: {
      padding: 16,
      borderRadius: 16,
    },
    topCategoriesTitle: {
      fontSize: 16,
      marginBottom: 16,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    categoryInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    categoryRank: {
      fontSize: 14,
      width: 30,
    },
    categoryName: {
      fontSize: 14,
    },
    categoryAmount: {
      fontSize: 14,
      fontWeight: '500',
      color: '#EF4444',
    },
  });
