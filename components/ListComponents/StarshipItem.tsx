import {HStack, Spacer, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {TextField} from '../FieldComponents/TextField';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

interface ItemProps {
  item: any;
  groupBy: any;
}

export const StarshipItemComponent = memo(({item, groupBy}: ItemProps) => {
  // Stylize
  const theme = useTheme();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);
  if (isLoading || !dbState) {
    return <></>;
  }

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const armor = <Text color={theme.colors.text}>{'Armor: ' + item.armor}</Text>;
  const category = (
    <HStack>
      <Text color={theme.colors.text}>{'Category: '}</Text>
      <Text color={theme.colors.text}>
        dbState.vehicles.category[item.category].name
      </Text>
    </HStack>
  );
  const crew = (
    <Text color={theme.colors.text}>
      {'Crew: ' + item.crew.toLocaleString()}
    </Text>
  );
  const defense = (
    <Text color={theme.colors.text}>{'Defense: ' + item.defense}</Text>
  );
  const effects = item.additional_rules && (
    <HStack>
      <Text color={theme.colors.text}>{'Effects: '}</Text>
      <HStack flexWrap={'wrap'} flex={1}>
        {item.additional_rules.map((rule: Special, index: number) => {
          const dbRule = dbState.additional_rule.find(
            x => x.id === rule.id,
          ) as WeaponEffect; // Won't be undefined or should fail
          return (
            <TouchableOpacity
              disabled={!allowClickthrough}
              onPress={() => Alert.alert(dbRule.name, dbRule.desc)}>
              <Text color={theme.colors.text}>
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
    <Text color={theme.colors.text}>
      {'Encum: ' + item.encumbrance.toLocaleString()}
    </Text>
  );
  const handling = (
    <Text color={theme.colors.text}>{'Handling: ' + item.handling}</Text>
  );
  const hardpoints = (
    <Text color={theme.colors.text}>{'HP: ' + item.hardpoints}</Text>
  );
  const htt = <Text color={theme.colors.text}>{'HTT: ' + item.htt}</Text>;
  const hyperdrive = (
    <Text color={theme.colors.text}>{'Hyperdrive: ' + item.hyperdrive}</Text>
  );
  const manufacturer = (
    <HStack flex={1}>
      <Text color={theme.colors.text}>{'Manufacturer: '}</Text>
      <Text color={theme.colors.text} flexWrap={'wrap'} flex={1}>
        {dbState.vehicles.manufacturer[item.manufacturer].name}
      </Text>
    </HStack>
  );
  const model = (
    <TextField
      title="Model"
      value={item.model}
      editMode={editMode}
      setValue={(value: string) => setEditItem({...editItem, model: value})}
    />
  );
  const navicomputer = (
    <Text color={theme.colors.text}>
      {'Navicomputer: ' + item.navicomputer}
    </Text>
  );
  const passengers = (
    <Text color={theme.colors.text}>
      {'Passengers: ' + item.passengers.toLocaleString()}
    </Text>
  );
  const sensors = (
    <HStack>
      <Text color={theme.colors.text}>{'Sensors: '}</Text>
      <Text color={theme.colors.text}>
        {dbState.vehicles.sensor[item.sensors].name}
      </Text>
    </HStack>
  );
  const silhouette = (
    <Text color={theme.colors.text}>{'Silhouette: ' + item.silhouette}</Text>
  );
  const speed = <Text color={theme.colors.text}>{'Speed: ' + item.speed}</Text>;
  const sst = <Text color={theme.colors.text}>{'SST: ' + item.sst}</Text>;
  const weapons = (
    <Text color={theme.colors.text}>{'Weapons: ' + item.weapons}</Text>
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
        <Spacer flex={1} />
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
      editMode={editMode}
      setEditMode={setEditMode}
      setEditItem={setEditItem}
    />
  );
});
