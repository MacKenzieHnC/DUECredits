import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {ItemComponent} from './Item';

export const AttachmentItemComponent = memo(({item}) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">HP: {item.hardpoints}</Text>
        <Text color="white">Encum: {item.encumbrance}</Text>
      </HStack>
    </ItemComponent>
  );
});
