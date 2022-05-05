import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {AttachmentItem} from '../models/ItemIndex';
import {ItemComponent} from './Item';

interface AttachmentItemProps {
  item: AttachmentItem;
}

export const AttachmentItemComponent = memo(({item}: AttachmentItemProps) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color="white">HP: {item.hardpoints}</Text>
        <Text color="white">Encum: {item.encumbrance}</Text>
      </HStack>
    </ItemComponent>
  );
});
