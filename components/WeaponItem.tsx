import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WeaponItem, Item} from '../models/ItemIndex';
import {ItemComponent} from './Item';
export const WeaponItemComponent: React.FC<{
  weaponItem: WeaponItem;
  itemProps: Item;
  key: number;
}> = ({itemProps, weaponItem}) => {
  return (
    <ItemComponent
      itemProps={itemProps}
      childProps={
        <View>
          <View style={styles.weaponItemTextContainer}>
            <Text>
              {'Skill: '}
              {weaponItem.skill}
            </Text>
            <View style={styles.spacer} />
            <Text>
              {'Range: '}
              {weaponItem.range}
            </Text>
          </View>
          <View style={styles.weaponItemTextContainer}>
            <Text>
              {'Dam: '}
              {weaponItem.damage}
            </Text>
            <View style={styles.spacer} />
            <Text>
              {'Crit: '}
              {weaponItem.crit}
            </Text>
          </View>
          <View style={styles.weaponItemTextContainer}>
            <Text>
              {'HP: '}
              {weaponItem.hardpoints}
            </Text>
            <View style={styles.spacer} />
            <Text>
              {'Encum.: '}
              {weaponItem.encumbrance}
            </Text>
          </View>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  weaponItemContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  weaponItemTextContainer: {
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
