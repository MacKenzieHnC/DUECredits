import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {ArmorItem} from '../models/ItemIndex';
import {ItemComponent} from './Item';

interface ArmorItemProps {
  item: ArmorItem;
}

export const ArmorItemComponent = ({item}: ArmorItemProps) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <VStack>
          <Text color="white">Def: {item.defense}</Text>
          <Text color="white">HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color="white">Soak: {item.soak}</Text>
          <Text color="white">Encum: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </ItemComponent>
  );
};
