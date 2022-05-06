import {Text} from 'native-base';
import React, {memo} from 'react';
import {GearItem} from '../../models/ItemIndex';
import {ItemComponent} from './Item';

interface GearItemProps {
  item: GearItem;
}

export const GearItemComponent = memo(({item}: GearItemProps) => {
  return (
    <ItemComponent item={item}>
      <Text color="white">Encum: {item.encumbrance}</Text>
    </ItemComponent>
  );
});
