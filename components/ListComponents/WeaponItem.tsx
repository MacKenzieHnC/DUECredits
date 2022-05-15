import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const WeaponItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <VStack>
          <Text color={theme.text}>Skill: {item.skill}</Text>
          <Text color={theme.text}>Dam: {item.damage}</Text>
          <Text color={theme.text}>HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>Range: {item.range}</Text>
          <Text color={theme.text}>Crit: {item.crit}</Text>
          <Text color={theme.text}>Encum.: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </ItemComponent>
  );
});
