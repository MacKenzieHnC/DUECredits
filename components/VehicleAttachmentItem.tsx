import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {VehicleAttachmentItem} from '../models/ItemIndex';
import {ItemComponent} from './Item';

interface VehicleAttachmentItemProps {
  item: VehicleAttachmentItem;
}

export const VehicleAttachmentItemComponent = memo(
  ({item}: VehicleAttachmentItemProps) => {
    return (
      <ItemComponent item={item}>
        <HStack space={3}>
          <Text color="white">HP: {item.hardpoints}</Text>
        </HStack>
      </ItemComponent>
    );
  },
);
