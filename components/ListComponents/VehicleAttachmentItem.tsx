import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleAttachmentItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color={theme.text}>HP: {item.hardpoints}</Text>
      </HStack>
    </ItemComponent>
  );
});
