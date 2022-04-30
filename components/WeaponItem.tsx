import {HStack, VStack, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WeaponItem, Item} from '../models/ItemIndex';
import {ItemComponent} from './Item';

interface WeaponItemProps {
  item: WeaponItem;
}

export const WeaponItemComponent = ({item}: WeaponItemProps) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <VStack>
          <Text color="white">Skill: {item.skill}</Text>
          <Text color="white">Dam: {item.damage}</Text>
          <Text color="white">HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color="white">Range: {item.range}</Text>
          <Text color="white">Crit: {item.crit}</Text>
          <Text color="white">Encum.: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </ItemComponent>
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
