import {HStack, Spacer, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
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

export const StarshipItemComponent = ({item, groupBy}: ItemProps) => {
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
  const armor = useMemo(() => {
    return <Text color={theme.colors.text}>{'Armor: ' + item.armor}</Text>;
  }, [item.armor, theme.colors.text]);

  const category = useMemo(() => {
    return (
      <HStack>
        <Text color={theme.colors.text}>{'Category: '}</Text>
        <Text color={theme.colors.text}>
          dbState.vehicles.category[item.category].name
        </Text>
      </HStack>
    );
  }, [theme.colors.text]);

  const crew = useMemo(() => {
    return (
      <Text color={theme.colors.text}>
        {'Crew: ' + item.crew.toLocaleString()}
      </Text>
    );
  }, [item.crew, theme.colors.text]);

  const defense = useMemo(() => {
    return <Text color={theme.colors.text}>{'Defense: ' + item.defense}</Text>;
  }, [item.defense, theme.colors.text]);

  const effects = useMemo(() => {
    return (
      dbState &&
      item.additional_rules && (
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
      )
    );
  }, [allowClickthrough, dbState, item.additional_rules, theme.colors.text]);

  const encumbrance = useMemo(() => {
    return (
      <Text color={theme.colors.text}>
        {'Encum: ' + item.encumbrance.toLocaleString()}
      </Text>
    );
  }, [item.encumbrance, theme.colors.text]);

  const handling = useMemo(() => {
    return (
      <Text color={theme.colors.text}>{'Handling: ' + item.handling}</Text>
    );
  }, [item.handling, theme.colors.text]);

  const hardpoints = useMemo(() => {
    return <Text color={theme.colors.text}>{'HP: ' + item.hardpoints}</Text>;
  }, [item.hardpoints, theme.colors.text]);

  const htt = useMemo(() => {
    return <Text color={theme.colors.text}>{'HTT: ' + item.htt}</Text>;
  }, [item.htt, theme.colors.text]);

  const hyperdrive = useMemo(() => {
    return (
      <Text color={theme.colors.text}>{'Hyperdrive: ' + item.hyperdrive}</Text>
    );
  }, [item.hyperdrive, theme.colors.text]);

  const manufacturer = useMemo(() => {
    return (
      dbState && (
        <HStack flex={1}>
          <Text color={theme.colors.text}>{'Manufacturer: '}</Text>
          <Text color={theme.colors.text} flexWrap={'wrap'} flex={1}>
            {dbState.vehicles.manufacturer[item.manufacturer].name}
          </Text>
        </HStack>
      )
    );
  }, [dbState, item.manufacturer, theme.colors.text]);

  const model = useMemo(() => {
    return (
      <TextField
        title="Model"
        value={item.model}
        editMode={editMode}
        setValue={(value: string) => setEditItem({...editItem, model: value})}
      />
    );
  }, [editItem, editMode, item.model]);

  const navicomputer = useMemo(() => {
    return (
      <Text color={theme.colors.text}>
        {'Navicomputer: ' + item.navicomputer}
      </Text>
    );
  }, [item.navicomputer, theme.colors.text]);

  const passengers = useMemo(() => {
    return (
      <Text color={theme.colors.text}>
        {'Passengers: ' + item.passengers.toLocaleString()}
      </Text>
    );
  }, [item.passengers, theme.colors.text]);

  const sensors = useMemo(() => {
    return (
      dbState && (
        <HStack>
          <Text color={theme.colors.text}>{'Sensors: '}</Text>
          <Text color={theme.colors.text}>
            {dbState.vehicles.sensor[item.sensors].name}
          </Text>
        </HStack>
      )
    );
  }, [dbState, item.sensors, theme.colors.text]);

  const silhouette = useMemo(() => {
    return (
      <Text color={theme.colors.text}>{'Silhouette: ' + item.silhouette}</Text>
    );
  }, [item.silhouette, theme.colors.text]);

  const speed = useMemo(() => {
    return <Text color={theme.colors.text}>{'Speed: ' + item.speed}</Text>;
  }, [item.speed, theme.colors.text]);

  const sst = useMemo(() => {
    return <Text color={theme.colors.text}>{'SST: ' + item.sst}</Text>;
  }, [item.sst, theme.colors.text]);

  const weapons = useMemo(() => {
    return <Text color={theme.colors.text}>{'Weapons: ' + item.weapons}</Text>;
  }, [item.weapons, theme.colors.text]);

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
  }, [category, encumbrance, groupBy, handling, hardpoints, silhouette, speed]);

  const mid_hidden = useMemo(() => {
    return (
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
  }, [
    armor,
    crew,
    defense,
    groupBy,
    htt,
    hyperdrive,
    manufacturer,
    model,
    navicomputer,
    passengers,
    sensors,
    sst,
    weapons,
  ]);

  const bottom = useMemo(() => {
    return effects;
  }, [effects]);

  if (isLoading || !dbState) {
    return <></>;
  }

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
};
