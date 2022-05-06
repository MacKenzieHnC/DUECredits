import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {VehicleWeaponItem} from '../../models/ItemIndex';
import {ItemComponent} from './Item';

interface VehicleWeaponItemProps {
  item: VehicleWeaponItem;
}

export const VehicleWeaponItemComponent = memo(
  ({item}: VehicleWeaponItemProps) => {
    return (
      <ItemComponent item={item}>
        <HStack space={3}>
          <Text color="white">Damage: {item.damage}</Text>
        </HStack>
      </ItemComponent>
    );
  },
);
