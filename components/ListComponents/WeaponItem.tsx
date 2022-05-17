import {HStack, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const WeaponItemComponent = memo(({item, groupBy}: any) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState || allowClickthrough === undefined) {
    return <></>;
  }

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const category = (
    <HStack>
      <Text color={theme.text}>{'Category: '}</Text>
      <Text color={theme.text}>
        {dbState.weapons.category[item.category].name}
      </Text>
    </HStack>
  );
  const crit = <Text color={theme.text}>Crit: {item.crit}</Text>;
  const damage = <Text color={theme.text}>Dam: {item.damage}</Text>;
  const encumbrance = (
    <Text color={theme.text}>Encum.: {item.encumbrance}</Text>
  );
  const hardpoints = <Text color={theme.text}>HP: {item.hardpoints}</Text>;
  const range = (
    <HStack>
      <Text color={theme.text}>{'Range: '}</Text>
      <Text color={theme.text}>{dbState.weapons.range[item.range].name}</Text>
    </HStack>
  );
  const skill = (
    <HStack>
      <Text color={theme.text}>{'Skill: '}</Text>
      <Text color={theme.text}>{dbState.weapons.skill[item.skill].name}</Text>
    </HStack>
  );
  const weapon_effects = item.weapon_effects && (
    <HStack>
      <Text color={theme.text}>{'Effects: '}</Text>
      <HStack flexWrap={'wrap'} flex={1}>
        {item.weapon_effects.map((effect: Special, index: number) => {
          const dbEffect = dbState.weapon_effect.find(
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

  ////////////////////////////////
  //
  //  Card components
  //
  ////////////////////////////////
  const top = (
    <VStack>
      {groupBy !== 'category' && category}
      {groupBy !== 'skill' && skill}
      {groupBy !== 'range' && range}
      <HStack space={3}>
        <VStack>
          {damage}
          {hardpoints}
        </VStack>
        <VStack>
          {crit}
          {encumbrance}
        </VStack>
      </HStack>
    </VStack>
  );

  const mid = weapon_effects;

  return (
    <ItemComponent
      item={item}
      top={top}
      mid={mid}
      setAllowClickthrough={setAllowClickthrough}
    />
  );
});
