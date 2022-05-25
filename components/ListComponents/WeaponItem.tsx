import {HStack, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const WeaponItemComponent = ({item, groupBy}: any) => {
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);
  // Stylize
  const theme = useTheme();

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const category = useMemo(() => {
    return (
      dbState && (
        <HStack>
          <Text color={theme.colors.text}>{'Category: '}</Text>
          <Text color={theme.colors.text}>
            {dbState.weapons.category[item.category].name}
          </Text>
        </HStack>
      )
    );
  }, [dbState, item.category, theme.colors.text]);

  const crit = useMemo(() => {
    return <Text color={theme.colors.text}>Crit: {item.crit}</Text>;
  }, [item.crit, theme.colors.text]);

  const damage = useMemo(() => {
    return <Text color={theme.colors.text}>Dam: {item.damage}</Text>;
  }, [item.damage, theme.colors.text]);

  const encumbrance = useMemo(() => {
    return <Text color={theme.colors.text}>Encum.: {item.encumbrance}</Text>;
  }, [item.encumbrance, theme.colors.text]);

  const hardpoints = useMemo(() => {
    return <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>;
  }, [item.hardpoints, theme.colors.text]);

  const range = useMemo(() => {
    return (
      dbState && (
        <HStack>
          <Text color={theme.colors.text}>{'Range: '}</Text>
          <Text color={theme.colors.text}>
            {dbState.weapons.range[item.range].name}
          </Text>
        </HStack>
      )
    );
  }, [dbState, item.range, theme.colors.text]);

  const skill = useMemo(() => {
    return (
      dbState && (
        <HStack>
          <Text color={theme.colors.text}>{'Skill: '}</Text>
          <Text color={theme.colors.text}>
            {dbState.weapons.skill[item.skill].name}
          </Text>
        </HStack>
      )
    );
  }, [dbState, item.skill, theme.colors.text]);

  const weapon_effects = useMemo(() => {
    return (
      dbState &&
      item.weapon_effects && (
        <HStack>
          <Text color={theme.colors.text}>{'Effects: '}</Text>
          <HStack flexWrap={'wrap'} flex={1}>
            {item.weapon_effects.map((effect: Special, index: number) => {
              const dbEffect = dbState.weapon_effect.find(
                x => x.id === effect.id,
              ) as WeaponEffect; // Won't be undefined or should fail
              return (
                <TouchableOpacity
                  disabled={!allowClickthrough}
                  onPress={() => Alert.alert(dbEffect.name, dbEffect.desc)}>
                  <Text color={theme.colors.text}>
                    {dbEffect.name +
                      (effect.modifier !== '' ? ': ' + effect.modifier : '')}
                    {index < item.weapon_effects.length - 1 && ', '}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </HStack>
      )
    );
  }, [allowClickthrough, dbState, item.weapon_effects, theme.colors.text]);

  ////////////////////////////////
  //
  //  Card components
  //
  ////////////////////////////////
  const top = useMemo(() => {
    return (
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
  }, [category, crit, damage, encumbrance, groupBy, hardpoints, range, skill]);

  const mid = useMemo(() => {
    return weapon_effects;
  }, [weapon_effects]);

  if (isLoading || !dbState || allowClickthrough === undefined) {
    return <></>;
  }
  return (
    <ItemComponent
      item={item}
      top={top}
      mid={mid}
      setAllowClickthrough={setAllowClickthrough}
      editMode={editMode}
      setEditMode={setEditMode}
      setEditItem={setEditItem}
    />
  );
};
