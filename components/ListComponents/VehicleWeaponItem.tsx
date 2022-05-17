import {HStack, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {CategoryLike, Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleWeaponItemComponent = memo(({item, groupBy}: any) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState) {
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
  const crit = <Text color={theme.text}>Crit.: {item.crit}</Text>;
  const damage = <Text color={theme.text}>Dam.: {item.damage}</Text>;
  const sensors = (
    <Text color={theme.text}>
      Range:{' '}
      {
        (dbState.vehicles.sensor.find(x => x.id === item.range) as CategoryLike)
          .name
      }
    </Text>
  );
  const silhouette = (
    <Text color={theme.text}>Silhouette: {item.compatible_silhouette}</Text>
  );
  const weapon_effects = (
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

  const mid = item.weapon_effects && weapon_effects;

  return (
    <ItemComponent
      item={item}
      top={top}
      mid={mid}
      setAllowClickthrough={setAllowClickthrough}
    />
  );
});
