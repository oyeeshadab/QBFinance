import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useCalculator } from './useCalculator';
import Text from '@components/Text/Text';
import { useStyle } from './styles';

const keys = [
  '1',
  '2',
  '3',
  '÷',
  '4',
  '5',
  '6',
  '×',
  '7',
  '8',
  '9',
  '-',
  '.',
  '0',
  '⌫',
  '+',
];

export const AmountCalculator = ({
  bottomSheetRef,
  darkBackgroundColor,
  amount,
  setAmount,
}: {
  bottomSheetRef: any;
  darkBackgroundColor: string;
  amount: number | string;
  setAmount: Dispatch<SetStateAction<number | string>>;
}) => {
  const styles = useStyle();
  const { expression, appendValue, deleteLast } = useCalculator({
    amount,
    setAmount,
  });

  const handlePress = (key: string) => {
    if (key === '⌫') {
      deleteLast();
      return;
    }

    appendValue(key);
  };

  return (
    <>
      <View style={[styles.gradientContainer]}>
        <View style={[styles.bottomSection]}>
          <Text weight="regular" variant="h2" color="#ffffff">
            Enter Amount
          </Text>
          <View style={styles.displayContainer}>
            <Text variant="h3" weight="deliusR" color="#ffffff">
              {expression || '0'}
            </Text>

            <Text
              variant="h1"
              style={styles.result}
              color="#ffffff"
              weight="deliusR"
            >
              ₹{Number(amount || '0').toFixed(2)}
            </Text>
          </View>
          <View
            style={[styles.keypad, { backgroundColor: darkBackgroundColor }]}
          >
            {keys.map((key, index) => (
              <TouchableOpacity
                key={index}
                style={styles.key}
                onPress={() => handlePress(key)}
              >
                <Text variant="h2" weight="deliusR" style={styles.keyText}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => bottomSheetRef.current?.close()}
        style={[styles.button, { backgroundColor: darkBackgroundColor }]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </>
  );
};
