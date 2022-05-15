import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color={theme.text}>HP: {item.hardpoints}</Text>
        <Text color={theme.text}>Encum: {item.encumbrance}</Text>
      </HStack>
    </ItemComponent>
  );
});
