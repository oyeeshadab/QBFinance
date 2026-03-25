// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import { useCategoryGrid } from './useCategoryGrid';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles';
// import { darkenHex, lightenHex } from '@utils/color';
// import { useTransaction } from '@screens/Secret/FinanceTracker/Transactions/useTransaction';

// const COLORS = [
//   '#A78BFA',
//   '#F472B6',
//   '#60A5FA',
//   '#34D399',
//   '#FBBF24',
//   '#F87171',
// ];

// export const CreateCategorySheet = () => {
//   const [title, setTitle] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState('shopping-bag');
//   const [selectedColor, setSelectedColor] = useState(COLORS[0]);
//   //   const { currentGradient } = useCategoryGrid();
//   const navigation = useNavigation();
//   const {
//     ripplePos,
//     opacityAnim,
//     scaleAnim,
//     nextColorRef,
//     currentGradient,
//     onColorPress,
//   } = useTransaction({});
//   const handleCreate = () => {
//     // navigation.goBack();
//     // onCreate({
//     //   name: title,
//     //   icon: selectedIcon,
//     //   color: selectedColor,
//     //   iconLibrary: 'Feather',
//     // });
//     // sheetRef.current?.close();
//     navigation.goBack();
//   };

//   const Catitem = {
//     // id: 1,
//     // icon: 'Grocery',
//     // iconLibrary: 'Ionicons',
//     // name: 'Groceries3',
//     color: '#34D399',
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'transparent' }}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <LinearGradient
//           colors={currentGradient}
//           style={StyleSheet.absoluteFill}
//         />

//         <Animated.View
//           pointerEvents="none"
//           style={[
//             styles.revealCircle,
//             {
//               left: ripplePos.current.x,
//               top: ripplePos.current.y,
//               opacity: opacityAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         >
//           <LinearGradient
//             colors={[
//               lightenHex(nextColorRef.current),
//               darkenHex(nextColorRef.current),
//               '#000000',
//             ]}
//             style={StyleSheet.absoluteFill}
//           />
//         </Animated.View>
//         <View style={{ padding: 20 }}>
//           <Text style={{ fontSize: 18, fontWeight: '600' }}>
//             Create Category
//           </Text>

//           <TextInput
//             placeholder="Category name"
//             value={title}
//             onChangeText={setTitle}
//             style={{
//               marginTop: 20,
//               borderWidth: 1,
//               borderRadius: 10,
//               padding: 12,
//             }}
//           />

//           {/* ICON SELECTOR */}

//           <Text style={{ marginTop: 20 }}>Select Icon</Text>

//           <FlatList
//             data={ICONS}
//             horizontal
//             keyExtractor={item => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => alert('sdfsd')}
//                 style={{
//                   padding: 12,
//                   marginRight: 10,
//                   borderRadius: 10,
//                   backgroundColor:
//                     selectedIcon === item ? '#E5E7EB' : 'transparent',
//                 }}
//               >
//                 <Icon name={item} size={24} />
//               </TouchableOpacity>
//             )}
//           />

//           {/* COLOR SELECTOR */}

//           <Text style={{ marginTop: 20 }}>Select Color</Text>

//           <FlatList
//             data={COLORS}
//             horizontal
//             keyExtractor={item => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={e => onColorPress(Catitem, e)}
//                 style={{
//                   height: 40,
//                   width: 40,
//                   borderRadius: 20,
//                   backgroundColor: item,
//                   marginRight: 12,
//                   borderWidth: selectedColor === item ? 3 : 0,
//                   borderColor: '#000',
//                 }}
//               />
//             )}
//           />

//           <TouchableOpacity
//             onPress={handleCreate}
//             style={{
//               marginTop: 30,
//               backgroundColor: '#6BA1C6',
//               padding: 16,
//               borderRadius: 14,
//               alignItems: 'center',
//             }}
//           >
//             <Text>Create Category</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

import React from 'react';
import Text from '@components/Text/Text';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransaction } from '@screens/Secret/FinanceTracker/Transactions/useTransaction';
// import { useTransaction } from './useTransaction';
// import { useStyle } from './styles';
import { CategoryIcon } from '@components/FinanceTracker/Components/CategoryIconComponent';
import { Toast } from '@components/Toast/Toast';
import BottomSheetComponent from '@components/BottomSheet/BottomSheetComponent';
import { AmountCalculator } from '@components/Calculator/Calulator';
import { TransactionTypeToggle } from '@components/TransactionTypeToggle/TransactionTypeToggle';
import { CategoryGrid } from '@components/FinanceTracker/Components/CategoryGrid/CategoryGrid';
import { darkenHex, lightenHex } from '@utils/color';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/AppNavigator';
import ActionButton from '@components/FinanceTracker/Components/ActionButton';
import { BtnType } from '@app-types/index';
import { useStyle } from '@screens/Secret/FinanceTracker/Transactions/styles';
import { useTheme } from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';
type AddTransactionRouteProp = RouteProp<RootStackParamList, 'AddTransaction'>;

type Props = {
  route: AddTransactionRouteProp;
};
// const CreateCategorySheet: React.FC<Props> = ({ route }) => {
export const CreateCategorySheet = ({ route }) => {
  const { item } = route?.params || {};

  const {
    type,
    title,
    amount,
    setType,
    titleRef,
    setTitle,
    ripplePos,
    showToast,
    setAmount,
    scaleAnim,
    opacityAnim,
    toastMessage,
    nextColorRef,
    buttonConfig,
    onColorPress,
    selectedColor,
    bottomSheetRef,
    getCurrentTime,
    openBootomSheet,
    currentGradient,
    selectedCategory,
    createTransaction,
    deleteTransaction,
    navigation,
  } = useTransaction(item);
  const { theme } = useTheme();
  const styles = useStyle(theme);
  const { hours, minutes, ampm } = getCurrentTime();
  const ICONS = [
    'shopping-bag',
    'heart',
    'film',
    'dollar-sign',
    'truck',
    'coffee',
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={currentGradient}
          style={StyleSheet.absoluteFill}
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
              lightenHex(nextColorRef.current),
              darkenHex(nextColorRef.current),
              '#000000',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={styles.content}>
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

              <FlatList
                data={ICONS}
                horizontal
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => alert('sdfsd')}
                    style={{
                      padding: 12,
                      marginRight: 10,
                      borderRadius: 10,
                      //   backgroundColor:
                      //     selectedIcon === item ? '#E5E7EB' : 'transparent',
                    }}
                  >
                    <Icon name={item} size={24} />
                  </TouchableOpacity>
                )}
              />

              {/* <View style={styles.amountCard}>
                <CategoryIcon icon_name={selectedCategory?.icon} />
                <TouchableOpacity activeOpacity={0.5} onPress={openBootomSheet}>
                  <Text weight="deliusR" variant="h1" style={styles.amount}>
                    ₹{amount || 0}
                  </Text>
                </TouchableOpacity>
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

              <CategoryGrid onSelect={onColorPress} navigation={navigation} /> */}
            </ScrollView>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}

            <ActionButton
              title="Save"
              onPress={() => navigation.goBack()}
              type={BtnType.CREATE}
            />
          </View>
        </View>

        <Toast message={toastMessage} visible={showToast} />

        <BottomSheetComponent ref={bottomSheetRef}>
          <AmountCalculator
            backgroundColor={selectedColor}
            darkBackgroundColor={darkenHex(selectedColor)}
            bottomSheetRef={bottomSheetRef}
            amount={amount}
            setAmount={setAmount}
          />
        </BottomSheetComponent>
      </SafeAreaView>
    </View>
  );
};

export default CreateCategorySheet;
