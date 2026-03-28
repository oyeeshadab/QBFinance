import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import BlurView from '@sbaiahmed1/react-native-blur';
import Text from '@components/Text/Text';
import { useTheme } from '@theme/ThemeProvider';

const { width, height } = Dimensions.get('window');

const StatsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');
  const [selectedTab, setSelectedTab] = useState<'expense' | 'income'>(
    'expense',
  );

  // Sample data
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [450, 620, 380, 890, 520, 320, 280],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [2450, 3120, 2890, 3980],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const yearlyData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [
          12500, 13200, 14800, 13500, 14200, 15600, 16200, 15800, 14900, 13800,
          14500, 15100,
        ],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const incomeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [35000, 32000, 38000, 30000],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const expenseBreakdown = [
    {
      name: 'Food & Dining',
      amount: 4520,
      color: '#EF4444',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
    {
      name: 'Transportation',
      amount: 2350,
      color: '#F59E0B',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
    {
      name: 'Shopping',
      amount: 1850,
      color: '#10B981',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
    {
      name: 'Bills & Utilities',
      amount: 3240,
      color: '#3B82F6',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
    {
      name: 'Entertainment',
      amount: 1280,
      color: '#8B5CF6',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
    {
      name: 'Healthcare',
      amount: 890,
      color: '#EC4899',
      legendFontColor: theme.colors.white,
      legendFontSize: 12,
    },
  ];

  const incomeBreakdown = [
    {
      name: 'Salary',
      amount: 135000,
      color: '#10B981',
      legendFontColor: '#6B7280',
      legendFontSize: 12,
    },
    {
      name: 'Freelance',
      amount: 25000,
      color: '#3B82F6',
      legendFontColor: '#6B7280',
      legendFontSize: 12,
    },
    {
      name: 'Investments',
      amount: 8500,
      color: '#F59E0B',
      legendFontColor: '#6B7280',
      legendFontSize: 12,
    },
    {
      name: 'Gifts',
      amount: 3500,
      color: '#8B5CF6',
      legendFontColor: '#6B7280',
      legendFontSize: 12,
    },
  ];

  const getChartData = () => {
    if (selectedTab === 'expense') {
      switch (selectedPeriod) {
        case 'week':
          return weeklyData;
        case 'month':
          return monthlyData;
        case 'year':
          return yearlyData;
        default:
          return monthlyData;
      }
    } else {
      return incomeData;
    }
  };

  const getTotalAmount = () => {
    if (selectedTab === 'expense') {
      switch (selectedPeriod) {
        case 'week':
          return 3460;
        case 'month':
          return 12440;
        case 'year':
          return 178500;
        default:
          return 12440;
      }
    } else {
      return 135000;
    }
  };

  const getAverageAmount = () => {
    if (selectedTab === 'expense') {
      switch (selectedPeriod) {
        case 'week':
          return 494;
        case 'month':
          return 3110;
        case 'year':
          return 14875;
        default:
          return 3110;
      }
    } else {
      return 33750;
    }
  };

  const getHighestAmount = () => {
    if (selectedTab === 'expense') {
      switch (selectedPeriod) {
        case 'week':
          return 890;
        case 'month':
          return 3980;
        case 'year':
          return 16200;
        default:
          return 3980;
      }
    } else {
      return 38000;
    }
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  return (
    <FinanceTrackerWrapper padding useSafeArea blob bubble>
      <Header title="Stats" showProfile />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        {/* <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back-outline" size={24} color="#1F2937" />
          </Pressable>
          <Text style={styles.headerTitle}>Statistics</Text>
          <Pressable style={styles.filterButton}>
            <Icon name="options-outline" size={22} color="#3B82F6" />
          </Pressable>
        </View> */}

        {/* Period Selector */}
        <NeumorphicContainer>
          <View style={styles.periodContainer}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <Pressable
              style={[
                styles.periodButton,
                selectedPeriod === 'week' && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod('week')}
            >
              <Text color={theme.colors.white}>Week</Text>
            </Pressable>
            <Pressable
              style={[
                styles.periodButton,
                selectedPeriod === 'month' && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod('month')}
            >
              <Text color={theme.colors.white}>Month</Text>
            </Pressable>
            <Pressable
              style={[
                styles.periodButton,
                selectedPeriod === 'year' && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod('year')}
            >
              <Text color={theme.colors.white}>Year</Text>
            </Pressable>
          </View>
        </NeumorphicContainer>

        {/* Tab Selector */}
        <NeumorphicContainer>
          <View style={styles.tabContainer}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <Pressable
              style={[
                styles.tabButton,
                selectedTab === 'expense' && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab('expense')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'expense' && styles.tabTextActive,
                ]}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                selectedTab === 'income' && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab('income')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'income' && styles.tabTextActive,
                ]}
              >
                Income
              </Text>
            </Pressable>
          </View>
        </NeumorphicContainer>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <NeumorphicContainer>
            <View style={styles.statCard}>
              <BlurView
                blurType="regular"
                blurAmount={Platform.OS === 'ios' ? 25 : 5}
                style={[StyleSheet.absoluteFill]}
              />
              <Text color={theme.colors.white} style={styles.statLabel}>
                Total {selectedTab === 'expense' ? 'Spent' : 'Earned'}
              </Text>
              <Text color={theme.colors.white} style={styles.statValue}>
                ₹{getTotalAmount().toLocaleString()}
              </Text>
            </View>
          </NeumorphicContainer>
          <NeumorphicContainer>
            <View style={styles.statCard}>
              <BlurView
                blurType="regular"
                blurAmount={Platform.OS === 'ios' ? 25 : 5}
                style={[StyleSheet.absoluteFill]}
              />
              <Text color={theme.colors.white} style={styles.statLabel}>
                Total {selectedTab === 'expense' ? 'Spent' : 'Earned'}
              </Text>
              <Text color={theme.colors.white} style={styles.statValue}>
                ₹{getAverageAmount().toLocaleString()}
              </Text>
            </View>
          </NeumorphicContainer>
          <NeumorphicContainer>
            <View style={styles.statCard}>
              <BlurView
                blurType="regular"
                blurAmount={Platform.OS === 'ios' ? 25 : 5}
                style={[StyleSheet.absoluteFill]}
              />
              <Text color={theme.colors.white} style={styles.statLabel}>
                Total {selectedTab === 'expense' ? 'Spent' : 'Earned'}
              </Text>
              <Text color={theme.colors.white} style={styles.statValue}>
                ₹{getHighestAmount().toLocaleString()}
              </Text>
            </View>
          </NeumorphicContainer>
          {/* <View style={styles.statCard}>
            <Text style={styles.statLabel}>Average</Text>
            <Text style={styles.statValue}>
              ₹{getAverageAmount().toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Highest</Text>
            <Text style={styles.statValue}>
              ₹{getHighestAmount().toLocaleString()}
            </Text>
          </View> */}
        </View>

        {/* Line Chart */}
        {/* <NeumorphicContainer>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              {selectedTab === 'expense' ? 'Spending Trend' : 'Income Trend'}
            </Text>
            <LineChart
              data={getChartData()}
              width={width - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              formatYLabel={value => `₹${value}`}
              fromZero
            />
          </View>
        </NeumorphicContainer> */}

        {/* Breakdown Section */}
        <NeumorphicContainer>
          <View style={styles.breakdownCard}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownTitle} color={theme.colors.white}>
                {selectedTab === 'expense'
                  ? 'Expense Breakdown'
                  : 'Income Sources'}
              </Text>
              <Pressable>
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>

            <View style={styles.pieChartContainer}>
              <PieChart
                data={
                  selectedTab === 'expense' ? expenseBreakdown : incomeBreakdown
                }
                width={width - 40}
                height={200}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>

            {/* Breakdown List */}
            <View style={styles.breakdownList}>
              {(selectedTab === 'expense'
                ? expenseBreakdown
                : incomeBreakdown
              ).map((item, index) => (
                <View key={index} style={styles.breakdownItem}>
                  <View style={styles.breakdownItemLeft}>
                    <View
                      style={[styles.colorDot, { backgroundColor: item.color }]}
                    />
                    <Text
                      color={theme.colors.white}
                      style={styles.breakdownItemName}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={styles.breakdownItemAmount}
                    color={theme.colors.white}
                  >
                    ₹{item.amount.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </NeumorphicContainer>

        {/* Monthly Summary */}
        <NeumorphicContainer>
          <View style={styles.summaryCard}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <Text color={theme.colors.white} style={styles.summaryTitle}>
              Monthly Summary
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text color={theme.colors.white} style={styles.summaryLabel}>
                  Total Income
                </Text>
                <Text style={[styles.summaryValue, styles.incomeColor]}>
                  ₹1,35,000
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text color={theme.colors.white} style={styles.summaryLabel}>
                  Total Expenses
                </Text>
                <Text
                  color={theme.colors.white}
                  style={[styles.summaryValue, styles.expenseColor]}
                >
                  ₹12,440
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text color={theme.colors.white} style={styles.summaryLabel}>
                  Net Savings
                </Text>
                <Text style={[styles.summaryValue, styles.savingsColor]}>
                  ₹1,22,560
                </Text>
              </View>
            </View>
          </View>
        </NeumorphicContainer>

        {/* Top Categories */}
        <NeumorphicContainer>
          <View style={styles.topCategoriesCard}>
            <BlurView
              blurType="regular"
              blurAmount={Platform.OS === 'ios' ? 25 : 5}
              style={[StyleSheet.absoluteFill]}
            />
            <Text style={styles.topCategoriesTitle} color={theme.colors.white}>
              Top Spending Categories
            </Text>
            {expenseBreakdown.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryRank} color={theme.colors.white}>
                    #{index + 1}
                  </Text>
                  <Text style={styles.categoryName} color={theme.colors.white}>
                    {item.name}
                  </Text>
                </View>
                <Text style={styles.categoryAmount}>
                  ₹{item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </NeumorphicContainer>
      </ScrollView>
    </FinanceTrackerWrapper>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 140 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  filterButton: {
    padding: 4,
  },
  periodContainer: {
    flexDirection: 'row',
    // backgroundColor: '#FFFFFF',
    // paddingHorizontal: 20,
    paddingVertical: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#F3F4F6',
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
  periodText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#FFFFFF',
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
    // paddingHorizontal: 16,
    marginVertical: 16,
    // gap: 12,
  },
  statCard: {
    // flex: 1,
    // backgroundColor: '#FFFFFF',
    // borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 110,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    // color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  chartCard: {
    // backgroundColor: '#FFFFFF',
    marginTop: 16,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  chart: {
    marginLeft: -20,
    borderRadius: 16,
  },
  breakdownCard: {
    // backgroundColor: '#FFFFFF',
    // marginTop: 16,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
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
    // color: '#1F2937',
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
    // backgroundColor: '#FFFFFF',
    // marginTop: 16,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
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
    // color: '#6B7280',
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
    // marginTop: 16,
    // marginHorizontal: 16,
    // marginBottom: 30,
    padding: 16,
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
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
    // borderBottomWidth: 1,
    // borderBottomColor: '#F3F4F6',
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

export default StatsScreen;
