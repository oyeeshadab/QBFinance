import { useTheme } from '@theme/ThemeProvider';
import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@database/types';
import { TransactionRepo } from '@database/repository';

export const useStats = () => {
  const { theme } = useTheme();

  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');
  const [selectedTab, setSelectedTab] = useState<'expense' | 'income'>(
    'expense',
  );

  // State for dynamic data
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0 });

  // Fetch transactions on mount and when period changes
  useEffect(() => {
    fetchTransactions();
  }, [selectedPeriod]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { transactions: groupedTransactions, summary } =
        await TransactionRepo.getCurrentMonthTransactions();

      // Flatten grouped transactions for easier processing
      const flatTransactions = Object.values(groupedTransactions).flat();
      setTransactions(flatTransactions as Transaction[]);
      setSummary(summary);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter transactions based on selected period and tab
  const getFilteredTransactions = useCallback(() => {
    const now = new Date();
    let startDate: Date;

    switch (selectedPeriod) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
    }

    return transactions.filter(tx => {
      const txDate = new Date(tx.datetime);
      return txDate >= startDate && tx.type === selectedTab;
    });
  }, [transactions, selectedPeriod, selectedTab]);

  // Generate chart data based on filtered transactions
  const getChartData = useCallback(() => {
    const filtered = getFilteredTransactions();

    if (selectedTab === 'expense') {
      switch (selectedPeriod) {
        case 'week': {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const data = days.map(day => {
            const dayTransactions = filtered.filter(
              tx =>
                new Date(tx.datetime).toLocaleDateString('en-US', {
                  weekday: 'short',
                }) === day,
            );
            return dayTransactions.reduce((sum, tx) => sum + tx.amount, 0);
          });
          return {
            labels: days,
            datasets: [
              {
                data,
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          };
        }

        case 'month': {
          const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          const data = weeks.map((_, index) => {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - (3 - index) * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 7);

            const weekTransactions = filtered.filter(tx => {
              const txDate = new Date(tx.datetime);
              return txDate >= weekStart && txDate < weekEnd;
            });
            return weekTransactions.reduce((sum, tx) => sum + tx.amount, 0);
          });
          return {
            labels: weeks,
            datasets: [
              {
                data,
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          };
        }

        case 'year': {
          const months = [
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
          ];
          const data = months.map((_, index) => {
            const monthTransactions = filtered.filter(
              tx => new Date(tx.datetime).getMonth() === index,
            );
            return monthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
          });
          return {
            labels: months,
            datasets: [
              {
                data,
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          };
        }

        default:
          return { labels: [], datasets: [{ data: [] }] };
      }
    } else {
      // Income chart data
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const data = weeks.map((_, index) => {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (3 - index) * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        const weekTransactions = filtered.filter(tx => {
          const txDate = new Date(tx.datetime);
          return txDate >= weekStart && txDate < weekEnd;
        });
        return weekTransactions.reduce((sum, tx) => sum + tx.amount, 0);
      });
      return {
        labels: weeks,
        datasets: [
          {
            data,
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      };
    }
  }, [getFilteredTransactions, selectedPeriod, selectedTab]);

  // Get breakdown by category
  const getCategoryBreakdown = useCallback(() => {
    const filtered = getFilteredTransactions();

    const categoryMap = new Map();

    filtered.forEach(tx => {
      const categoryName = tx.category_name || 'Uncategorized';
      const categoryColor =
        tx.category_color ||
        (selectedTab === 'expense' ? '#EF4444' : '#10B981');

      if (categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          ...categoryMap.get(categoryName),
          amount: categoryMap.get(categoryName).amount + tx.amount,
        });
      } else {
        categoryMap.set(categoryName, {
          name: categoryName,
          amount: tx.amount,
          color: categoryColor,
          legendFontColor: theme.colors.text || '#FFFFFF',
          legendFontSize: 12,
        });
      }
    });

    // Sort by amount descending and take top 5
    const breakdown = Array.from(categoryMap.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return breakdown.length > 0
      ? breakdown
      : selectedTab === 'expense'
      ? [
          {
            name: 'No expenses',
            amount: 0,
            color: '#EF4444',
            legendFontColor: theme.colors.text,
            legendFontSize: 12,
          },
        ]
      : [
          {
            name: 'No income',
            amount: 0,
            color: '#10B981',
            legendFontColor: theme.colors.text,
            legendFontSize: 12,
          },
        ];
  }, [getFilteredTransactions, selectedTab, theme.colors.text]);

  const getTotalAmount = useCallback(() => {
    const filtered = getFilteredTransactions();
    return filtered.reduce((sum, tx) => sum + tx.amount, 0);
  }, [getFilteredTransactions]);

  const getAverageAmount = useCallback(() => {
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) return 0;
    return getTotalAmount() / filtered.length;
  }, [getTotalAmount]);

  const getHighestAmount = useCallback(() => {
    const filtered = getFilteredTransactions();
    if (filtered.length === 0) return 0;
    return Math.max(...filtered.map(tx => tx.amount));
  }, [getFilteredTransactions]);

  const chartConfig = {
    backgroundColor: theme.colors.background || '#FFFFFF',
    backgroundGradientFrom: theme.colors.background || '#FFFFFF',
    backgroundGradientTo: theme.colors.background || '#FFFFFF',
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

  // For backward compatibility, provide the old static data structure
  const weeklyData = getChartData();
  const monthlyData = getChartData();
  const yearlyData = getChartData();
  const incomeData = getChartData();
  const expenseBreakdown = getCategoryBreakdown();
  const incomeBreakdown = getCategoryBreakdown();

  return {
    isLoading,
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
    refreshData: fetchTransactions, // Expose refresh function
  };
};
