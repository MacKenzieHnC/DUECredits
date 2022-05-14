import {Text} from 'native-base';
import React, {memo} from 'react';
import {ItemComponent} from './Item';

export const GearItemComponent = memo(({item}) => {
  return (
    <ItemComponent item={item}>
      <Text color="white">Encum: {item.encumbrance}</Text>
    </ItemComponent>
  );
});
