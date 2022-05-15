import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const WeaponItemComponent = memo(({item}) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState) {
    return <></>;
  }

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

      <VStack flex={1}>
        {item.weapon_effects ? (
          <Text color={theme.text}>
            {'Effects: ' +
              item.weapon_effects
                .map(
                  effect =>
                    dbState.weapon_effects.find(x => x.id === effect.id).name + // Won't be undefined or should fail
                    (effect.modifier !== '' ? ': ' + effect.modifier : ''),
                )
                .join(', ')}
          </Text>
        ) : null}
      </VStack>
    </ItemComponent>
  );
});
