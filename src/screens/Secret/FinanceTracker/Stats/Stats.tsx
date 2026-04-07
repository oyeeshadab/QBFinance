import React from 'react';
import { View, ScrollView, Pressable, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import FinanceTrackerWrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import NeumorphicContainer from '@components/NeumorphicContainer/NeumorphicContainer';
import Text from '@components/Text/Text';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';
import { useStats } from './useStats';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
  const { theme } = useTheme();
  const styles = useStyle(theme);

  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedTab,
    setSelectedTab,
    weeklyData,
    monthlyData,
    yearlyData,
    incomeData,
    expenseBreakdown,
    incomeBreakdown,
    getTotalAmount,
    getAverageAmount,
    getHighestAmount,
    chartConfig,
  } = useStats();

  return (
    <FinanceTrackerWrapper padding useSafeArea blob bubble>
      <Header title="Stats" showProfile />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Period Selector */}
        <NeumorphicContainer>
          <View style={styles.periodContainer}>
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
              <Text color={theme.colors.white} style={styles.statLabel}>
                Total {selectedTab === 'expense' ? 'Spent' : 'Earned'}
              </Text>
              <Text color={theme.colors.white} style={styles.statValue}>
                ₹{getHighestAmount().toLocaleString()}
              </Text>
            </View>
          </NeumorphicContainer>
        </View>

        {/* Breakdown Section */}
        <NeumorphicContainer>
          <View style={styles.breakdownCard}>
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

export default StatsScreen;
