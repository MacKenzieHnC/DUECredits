import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const ArmorItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <VStack>
          <Text color={theme.text}>Def: {item.defense}</Text>
          <Text color={theme.text}>HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>Soak: {item.soak}</Text>
          <Text color={theme.text}>Encum: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </ItemComponent>
  );
});
