import {Text} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const GearItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <Text color={theme.text}>Encum: {item.encumbrance}</Text>
    </ItemComponent>
  );
});
