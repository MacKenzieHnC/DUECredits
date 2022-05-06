import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {PlanetaryVehicleItem} from '../../models/ItemIndex';
import {ItemComponent} from './Item';

interface VehicleItemProps {
  item: PlanetaryVehicleItem;
}

export const VehicleItemComponent = memo(({item}: VehicleItemProps) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">HP: {item.vehicle.hardpoints}</Text>
        <Text color="white">Encum: {item.vehicle.encumbrance}</Text>
      </HStack>
    </ItemComponent>
  );
});
