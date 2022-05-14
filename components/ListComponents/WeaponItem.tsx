import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {ItemComponent} from './Item';

export const WeaponItemComponent = memo(({item}) => {
  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <VStack>
          <Text color="white">Skill: {item.skill}</Text>
          <Text color="white">Dam: {item.damage}</Text>
          <Text color="white">HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color="white">Range: {item.range}</Text>
          <Text color="white">Crit: {item.crit}</Text>
          <Text color="white">Encum.: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </ItemComponent>
  );
});
