import * as Icons from '@assets/SVG';
import React, { memo, useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/Text/Text';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { lightenHex } from '@utils/color';

type IconEntry = [string, React.FC<any>];

const AllCategoriesComponent = ({ ref, setSelectedCategory }) => {
  const renderItem = useCallback(({ item }: { item: IconEntry }) => {
    const [name, IconComponent] = item;

    return (
      <View style={styles.itemWrapper}>
        <Pressable
          onPress={() => {
            console.log('🚀 ~ AllCategoriesComponent ~ item:', name);
            ref.current.close();
            setSelectedCategory(name);
          }}
          style={styles.colorItem}
        >
          <IconComponent width={45} height={45} />
        </Pressable>

        {/*  */}
      </View>
    );
  }, []);

  return (
    <>
      {/* <View style={{ flex: 1 }} /> */}
      <Pressable style={{ flex: 1 }} onPress={() => ref.current.close()} />

      <View
        style={{
          backgroundColor: lightenHex('#000000'),
          flex: 2,
          alignItems: 'center',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        {/* <LinearGradient
          colors={['#559484', '#154B4F', '#003044']}
          style={[
            StyleSheet.absoluteFill,
            { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}
        /> */}
        <View style={{ padding: 20, width: '100%' }}>
          <Text size={25} numberOfLines={1} color="#fff" weight="deliusR">
            Select Icon
          </Text>
        </View>
        <FlatList
          data={Object.entries(Icons)}
          keyExtractor={item => item[0]}
          numColumns={5}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export const AllCategoriesIcon = memo(AllCategoriesComponent);
