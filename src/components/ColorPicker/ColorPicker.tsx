import { View, Text, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';

const ColorPickerComponent = ({ setSelectedColorCat }) => {
  const pickerRef = useRef<any>(null);

  //   const [currentColor, setCurrentColor] = useState('#ffffff');
  const [swatchesOnly] = useState(false);
  const [swatchesLast] = useState(true);
  const [swatchesEnabled] = useState(true);
  const [disc] = useState(false);

  const onColorChange = (color: string) => {
    setSelectedColorCat(color);
  };

  const onColorChangeComplete = (color: string) => {
    console.log('Selected color:', color);
  };

  return (
    <View
      style={{
        marginVertical: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        height: 400,
        padding: 30,
      }}
    >
      <ColorPicker
        ref={pickerRef}
        // color={currentColor}
        swatchesOnly={swatchesOnly}
        onColorChange={onColorChange}
        onColorChangeComplete={onColorChangeComplete}
        thumbSize={15}
        sliderSize={15}
        noSnap
        row={false}
        swatchesLast={swatchesLast}
        swatches={swatchesEnabled}
        discrete={disc}
        useNativeDriver={false}
        useNativeLayout={false}
      />

      {/* <SomeButton onPress={() => pickerRef.current?.revert()} /> */}
    </View>
  );
};

export default ColorPickerComponent;
