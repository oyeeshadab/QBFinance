import React from 'react';
import Text from '@components/Text/Text';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransaction } from './useTransaction';
import { useStyle } from './styles';
import {
  CategoryIcon,
  IconName,
} from '@components/FinanceTracker/Components/CategoryIconComponent';
import BottomSheetComponent from '@components/BottomSheet/BottomSheetComponent';
import { AmountCalculator } from '@components/Calculator/Calulator';
import { TransactionTypeToggle } from '@components/TransactionTypeToggle/TransactionTypeToggle';
import { CategoryGrid } from '@components/FinanceTracker/Components/CategoryGrid/CategoryGrid';
import { darkenHex, lightenHex } from '@utils/color';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@navigation/AppNavigator';
import { BottomSheetDisplayType } from '@app-types/index';
import Header from '@components/FinanceTracker/Header/Header';
import Wrapper from '@components/Wrapper/Wrapper';
import { getScreenHeightWidth } from '@utils/dimention';

type AddTransactionRouteProp = RouteProp<AppStackParamList, 'AddTransaction'>;

type Props = {
  route: AddTransactionRouteProp;
};

const AddTransaction: React.FC<Props> = ({ route }) => {
  const { item } = route?.params || {};

  const {
    type,
    title,
    amount,
    setType,
    titleRef,
    setTitle,
    ripplePos,
    setAmount,
    scaleAnim,
    opacityAnim,
    nextColorRef,
    buttonConfig,
    onColorPress,
    selectedColor,
    bottomSheetRef,
    getCurrentTime,
    openBootomSheet,
    currentGradient,
    createTransaction,
    deleteTransaction,
    navigation,
    loading,
    sheetType,
  } = useTransaction(item);

  const styles = useStyle();
  const { hours, minutes, ampm } = getCurrentTime();

  return (
    <Wrapper>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={currentGradient}
          style={StyleSheet.absoluteFill}
        />
        <Header
          backButton
          deleteButton={item && item.id !== -1}
          deleteFun={deleteTransaction}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.revealCircle,
            {
              left: ripplePos.current.x,
              top: ripplePos.current.y,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[
              '#000000',
              darkenHex(darkenHex(nextColorRef.current)),
              '#000000',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={styles.content}>
          <ScrollView
            removeClippedSubviews
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {selectedColor && (
              <TransactionTypeToggle
                selectedColor={selectedColor}
                type={type}
                setType={setType}
              />
            )}

            <View style={styles.amountCard}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => openBootomSheet(BottomSheetDisplayType.CATEGORY)}
              >
                <CategoryIcon
                  icon_name={(item?.category_icon || 'Default') as IconName}
                />
              </Pressable>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => openBootomSheet(BottomSheetDisplayType.AMOUNT)}
              >
                <Text weight="deliusR" variant="h1" style={styles.amount}>
                  ₹{amount || 0}
                </Text>
              </Pressable>
            </View>

            <View style={styles.todayRow}>
              <Text style={styles.today}>Today</Text>
              <View style={styles.timeBox}>
                <Text style={styles.time}>{hours}</Text>
                <Text style={styles.timeColon}>:</Text>
                <Text style={styles.time}>{minutes}</Text>
                <Text style={styles.pm}>{ampm}</Text>
              </View>
            </View>

            <TextInput
              ref={titleRef}
              value={title}
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="rgba(255,255,255,0.5)"
              onChangeText={e => setTitle(e)}
            />

            <TouchableOpacity style={styles.attachment}>
              <Text style={styles.attachmentText}>Add attachment</Text>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={createTransaction}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: lightenHex(selectedColor),
              },
            ]}
          >
            <Text color="black" size={16}>
              {buttonConfig.label}
            </Text>
          </TouchableOpacity>
        </View>

        <BottomSheetComponent ref={bottomSheetRef}>
          <Pressable
            style={styles.container}
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          />
          <View style={{ height: getScreenHeightWidth().height / 1.45 }}>
            <LinearGradient
              colors={[
                '#000000',
                darkenHex(darkenHex(darkenHex(darkenHex(selectedColor)))),
                darkenHex(selectedColor),
              ]}
              style={StyleSheet.absoluteFill}
            />

            {sheetType === BottomSheetDisplayType.CATEGORY ? (
              <>
                {!loading ? (
                  <CategoryGrid
                    onSelect={onColorPress}
                    navigation={navigation}
                    ref={bottomSheetRef}
                    currentGradient={currentGradient}
                  />
                ) : (
                  <View style={styles.loaderContainer}>
                    <Text>Loading...</Text>
                  </View>
                )}
              </>
            ) : (
              <AmountCalculator
                darkBackgroundColor={darkenHex(selectedColor)}
                bottomSheetRef={bottomSheetRef}
                amount={amount}
                setAmount={setAmount}
              />
            )}
          </View>
        </BottomSheetComponent>
      </SafeAreaView>
      {/* </View> */}
    </Wrapper>
  );
};

export default AddTransaction;
