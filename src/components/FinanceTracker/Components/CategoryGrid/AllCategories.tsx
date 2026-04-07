import * as Icons from '@assets/SVG';
import React, { memo, useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Text from '@components/Text/Text';
import { styles } from './styles';

type IconEntry = [string, React.FC<any>];

const AllCategoriesComponent = ({
  ref,
  setSelectedCategory,
}: {
  ref: React.RefObject<{ close: () => void }>;
  setSelectedCategory: (category: string) => void;
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Pressable style={styles.overlay} onPress={() => ref.current.close()} />

      <View style={styles.allCategoryContiner}>
        <View style={styles.allCategoryHading}>
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
