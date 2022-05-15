import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleWeaponItemComponent = memo(({item}) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState) {
    return <></>;
  }

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color={theme.text}>Damage: {item.damage}</Text>
      </HStack>

      {item.weapon_effects && (
        <VStack flex={1}>
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
        </VStack>
      )}
    </ItemComponent>
  );
});
