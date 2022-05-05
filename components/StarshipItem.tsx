import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {StarshipItem} from '../models/ItemIndex';
import {ItemComponent} from './Item';

interface StarshipItemProps {
  item: StarshipItem;
}

export const StarshipItemComponent = memo(({item}: StarshipItemProps) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">HP: {item.vehicle.hardpoints}</Text>
        <Text color="white">Encum: {item.vehicle.encumbrance}</Text>
      </HStack>
    </ItemComponent>
  );
});
