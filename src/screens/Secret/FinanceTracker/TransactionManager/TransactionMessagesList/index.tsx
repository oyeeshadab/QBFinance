import React from 'react';
import { FlatList } from 'react-native';
import Wrapper from '@components/Wrapper/FinanceTrackerWrapper';
import Header from '@components/FinanceTracker/Header/Header';
import { useTransactionMessages } from './useTransactionMessages';
import TransactionMessageItem from './TransactionMessageItem';
import { styles } from './styles';
import LottieView from 'lottie-react-native';

const TransactionMessagesList = () => {
  const { transactions, handleDelete } = useTransactionMessages();

  return (
    <Wrapper padding useSafeArea bubble blob>
      <Header title="Transaction Messages" showProfile />
      {transactions.length === 0 && (
        <LottieView
          source={require('@assets/JSON/notFound.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      )}

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionMessageItem item={item} handleDelete={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        removeClippedSubviews
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Wrapper>
  );
};

export default TransactionMessagesList;
