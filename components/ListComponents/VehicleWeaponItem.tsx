import {HStack, Text, VStack} from 'native-base';
import React, {memo, useMemo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {CategoryLike, Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleWeaponItemComponent = memo(({item, groupBy}: any) => {
  // Stylize
  const theme = useTheme();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);

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
    return <Text color={theme.colors.text}>Crit.: {item.crit}</Text>;
  }, [item.crit, theme.colors.text]);

  const damage = useMemo(() => {
    return <Text color={theme.colors.text}>Dam.: {item.damage}</Text>;
  }, [item.damage, theme.colors.text]);

  const sensors = useMemo(() => {
    return (
      dbState && (
        <Text color={theme.colors.text}>
          Range:{' '}
          {
            (
              dbState.vehicles.sensor.find(
                x => x.id === item.range,
              ) as CategoryLike
            ).name
          }
        </Text>
      )
    );
  }, [dbState, item.range, theme.colors.text]);

  const silhouette = useMemo(() => {
    return (
      <Text color={theme.colors.text}>
        Silhouette: {item.compatible_silhouette}
      </Text>
    );
  }, [item.compatible_silhouette, theme.colors.text]);

  const weapon_effects = useMemo(() => {
    return (
      dbState && (
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
        <HStack space={3}>
          <VStack>
            {damage}
            {crit}
          </VStack>
          <VStack>
            {groupBy !== 'sensors' && sensors}
            {silhouette}
          </VStack>
        </HStack>
      </VStack>
    );
  }, [category, crit, damage, groupBy, sensors, silhouette]);

  const mid = useMemo(() => {
    return item.weapon_effects && weapon_effects;
  }, [item.weapon_effects, weapon_effects]);

  if (isLoading || !dbState) {
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
});
