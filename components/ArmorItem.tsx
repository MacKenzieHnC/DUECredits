import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ArmorItem, Item} from '../models';
import {ItemComponent} from './Item';
export const ArmorItemComponent: React.FC<{
  armorItem: ArmorItem;
  itemProps: Item;
  key: number;
}> = ({itemProps, armorItem}) => {
  return (
    <ItemComponent
      itemProps={itemProps}
      childProps={
        <View>
          <View style={styles.armorItemTextContainer}>
            <Text>
              {'Def: '}
              {armorItem.defense}
            </Text>
            <View style={styles.spacer} />
            <Text>
              {'Soak: '}
              {armorItem.soak}
            </Text>
          </View>
          <View style={styles.armorItemTextContainer}>
            <Text>
              {'HP: '}
              {armorItem.hardpoints}
            </Text>
            <View style={styles.spacer} />
            <Text>
              {'Encum.: '}
              {armorItem.encumbrance}
            </Text>
          </View>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  armorItemContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  armorItemTextContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  spacer: {
    marginLeft: 20,
    marginRight: 20,
  },
});
