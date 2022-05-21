import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleItemComponent = memo(({item, groupBy}: any) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
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
  const manufacturer = (
    <HStack flex={1}>
      <Text color={theme.colors.text}>{'Manufacturer: '}</Text>
      <Text color={theme.colors.text} flexWrap={'wrap'} flex={1}>
        {dbState.vehicles.manufacturer[item.manufacturer].name}
      </Text>
    </HStack>
  );
  const model = (
    <HStack flex={1}>
      <Text color={theme.colors.text}>{'Model: '}</Text>
      <Text color={theme.colors.text} flexWrap={'wrap'} flex={1}>
        {item.model}
      </Text>
    </HStack>
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
        <VStack>
          {htt}
          {armor}
          {passengers}
          {groupBy !== 'sensors' && sensors}
        </VStack>
      </HStack>
    </VStack>
  );

  return <ItemComponent item={item} top={top} mid_hidden={mid_hidden} />;
});
