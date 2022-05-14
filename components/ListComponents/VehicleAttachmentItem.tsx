import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {ItemComponent} from './Item';

export const VehicleAttachmentItemComponent = memo(({item}) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">HP: {item.hardpoints}</Text>
      </HStack>
    </ItemComponent>
  );
});
