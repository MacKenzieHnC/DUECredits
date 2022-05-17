import {HStack, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const StarshipItemComponent = memo(({item, groupBy}: any) => {
  // Stylize
  const theme = useTheme();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState) {
    return <></>;
  }

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const armor = <Text color={theme.text}>{'Armor: ' + item.armor}</Text>;
  const category = (
    <HStack>
      <Text color={theme.text}>{'Category: '}</Text>
      <Text color={theme.text}>
        dbState.vehicles.category[item.category].name
      </Text>
    </HStack>
  );
  const crew = (
    <Text color={theme.text}>{'Crew: ' + item.crew.toLocaleString()}</Text>
  );
  const defense = <Text color={theme.text}>{'Defense: ' + item.defense}</Text>;
  const effects = item.additional_rules && (
    <HStack>
      <Text color={theme.text}>{'Effects: '}</Text>
      <HStack flexWrap={'wrap'} flex={1}>
        {item.additional_rules.map((rule: Special, index: number) => {
          const dbRule = dbState.additional_rule.find(
            x => x.id === rule.id,
          ) as WeaponEffect; // Won't be undefined or should fail
          return (
            <TouchableOpacity
              disabled={!allowClickthrough}
              onPress={() => Alert.alert(dbRule.name, dbRule.desc)}>
              <Text color={theme.text}>
                {dbRule.name +
                  (rule.modifier !== '' ? ': ' + rule.modifier : '')}
                {index < item.additional_rules.length - 1 && ', '}
              </Text>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </HStack>
  );
  const encumbrance = (
    <Text color={theme.text}>
      {'Encum: ' + item.encumbrance.toLocaleString()}
    </Text>
  );
  const handling = (
    <Text color={theme.text}>{'Handling: ' + item.handling}</Text>
  );
  const hardpoints = <Text color={theme.text}>{'HP: ' + item.hardpoints}</Text>;
  const htt = <Text color={theme.text}>{'HTT: ' + item.htt}</Text>;
  const hyperdrive = (
    <Text color={theme.text}>{'Hyperdrive: ' + item.hyperdrive}</Text>
  );
  const manufacturer = (
    <HStack flex={1}>
      <Text color={theme.text}>{'Manufacturer: '}</Text>
      <Text color={theme.text} flexWrap={'wrap'} flex={1}>
        {dbState.vehicles.manufacturer[item.manufacturer].name}
      </Text>
    </HStack>
  );
  const model = (
    <HStack flex={1}>
      <Text color={theme.text}>{'Model: '}</Text>
      <Text color={theme.text} flexWrap={'wrap'} flex={1}>
        {item.model}
      </Text>
    </HStack>
  );
  const navicomputer = (
    <Text color={theme.text}>{'Navicomputer: ' + item.navicomputer}</Text>
  );
  const passengers = (
    <Text color={theme.text}>
      {'Passengers: ' + item.passengers.toLocaleString()}
    </Text>
  );
  const sensors = (
    <HStack>
      <Text color={theme.text}>{'Sensors: '}</Text>
      <Text color={theme.text}>
        {dbState.vehicles.sensor[item.sensors].name}
      </Text>
    </HStack>
  );
  const silhouette = (
    <Text color={theme.text}>{'Silhouette: ' + item.silhouette}</Text>
  );
  const speed = <Text color={theme.text}>{'Speed: ' + item.speed}</Text>;
  const sst = <Text color={theme.text}>{'SST: ' + item.sst}</Text>;
  const weapons = <Text color={theme.text}>{'Weapons: ' + item.weapons}</Text>;

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
          {silhouette}
          {handling}
          {hardpoints}
        </VStack>
        <VStack>
          {encumbrance}
          {speed}
        </VStack>
      </HStack>
    </VStack>
  );

  const mid_hidden = (
    <VStack space={3}>
      <VStack>
        {groupBy !== 'manufacturer' && manufacturer}
        {model}
      </VStack>
      <HStack space={3}>
        <VStack>
          {sst}
          {weapons}
          {defense}
          {crew}
        </VStack>
        <VStack>
          {htt}
          {armor}
          {passengers}
          {groupBy !== 'sensors' && sensors}
        </VStack>
      </HStack>
      {hyperdrive}
      {groupBy !== 'navicomputer' && navicomputer}
    </VStack>
  );

  const bottom = effects;

  return (
    <ItemComponent
      item={item}
      top={top}
      mid_hidden={mid_hidden}
      bottom={bottom}
      setAllowClickthrough={setAllowClickthrough}
    />
  );
});
