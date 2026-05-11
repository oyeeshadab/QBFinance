import { View, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';

const ColorPickerComponent = ({ setSelectedColorCat }) => {
  const pickerRef = useRef<any>(null);

  const isFirstRender = useRef(true);

  const [swatchesOnly] = useState(false);
  const [swatchesLast] = useState(true);
  const [swatchesEnabled] = useState(true);
  const [disc] = useState(false);

  const onColorChange = (color: string) => {
    if (isFirstRender.current) {
      if (color.toLowerCase() === '#ffffff') return;
    }

    setSelectedColorCat(color);
  };

  const onColorChangeComplete = (color: string) => {
    console.log('Selected color:', color);
  };

  return (
    <View style={styles.container}>
      <ColorPicker
        ref={pickerRef}
        swatchesOnly={swatchesOnly}
        onColorChange={onColorChange}
        onColorChangeComplete={onColorChangeComplete}
        thumbSize={18} // slightly bigger for better UX
        sliderSize={18}
        noSnap
        row={false}
        swatchesLast={swatchesLast}
        swatches={swatchesEnabled}
        discrete={disc}
        useNativeDriver={false}
        useNativeLayout={false}
      />
    </View>
  );
};

export default ColorPickerComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    borderWidth: 1,
    borderRadius: 10,
    height: 400,
    padding: 30,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
