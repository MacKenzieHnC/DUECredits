import {HStack, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const WeaponItemComponent = memo(({item}: any) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState || allowClickthrough === undefined) {
    return <></>;
  }

  const top = (
    <VStack>
      <HStack>
        <Text color={theme.text}>{'Category: '}</Text>
        <Text color={theme.text}>
          {dbState.weapons.categories[item.category].name}
        </Text>
      </HStack>
      <HStack>
        <Text color={theme.text}>{'Skill: '}</Text>
        <Text color={theme.text}>
          {dbState.weapons.skills[item.skill].name}
        </Text>
      </HStack>
      <HStack>
        <Text color={theme.text}>{'Range: '}</Text>
        <Text color={theme.text}>
          {dbState.weapons.ranges[item.range].name}
        </Text>
      </HStack>
      <HStack space={3}>
        <VStack>
          <Text color={theme.text}>Dam: {item.damage}</Text>
          <Text color={theme.text}>HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>Crit: {item.crit}</Text>
          <Text color={theme.text}>Encum.: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    </VStack>
  );

  const mid = item.weapon_effects && (
    <HStack>
      <Text color={theme.text}>{'Effects: '}</Text>
      <HStack flexWrap={'wrap'} flex={1}>
        {item.weapon_effects.map((effect: Special, index: number) => {
          const dbEffect = dbState.weapon_effects.find(
            x => x.id === effect.id,
          ) as WeaponEffect; // Won't be undefined or should fail
          return (
            <TouchableOpacity
              disabled={!allowClickthrough}
              onPress={() => Alert.alert(dbEffect.name, dbEffect.desc)}>
              <Text color={theme.text}>
                {dbEffect.name +
                  (effect.modifier !== '' ? ': ' + effect.modifier : '')}
                {index < item.weapon_effects.length - 1 && ', '}
              </Text>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </HStack>
  );

  return (
    <ItemComponent
      item={item}
      top={top}
      mid={mid}
      setAllowClickthrough={setAllowClickthrough}
    />
  );
});
