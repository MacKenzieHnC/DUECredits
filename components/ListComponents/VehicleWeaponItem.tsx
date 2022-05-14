import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {ItemComponent} from './Item';

export const VehicleWeaponItemComponent = memo(({item}) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">Damage: {item.damage}</Text>
      </HStack>
    </ItemComponent>
  );
});
