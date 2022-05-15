import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleWeaponItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color={theme.text}>Damage: {item.damage}</Text>
      </HStack>
    </ItemComponent>
  );
});
