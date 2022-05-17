import {HStack, Text, View, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState) {
    return <></>;
  }

  const top = (
    <VStack>
      <HStack>
        <Text color={theme.text}>{'Category: '}</Text>
        <Text color={theme.text}>
          {dbState.vehicles.categories[item.category].name}
        </Text>
      </HStack>
      <HStack space={3}>
        <VStack>
          <Text color={theme.text}>{'Silhouette: ' + item.silhouette}</Text>
          <Text color={theme.text}>{'Handling: ' + item.handling}</Text>
          <Text color={theme.text}>{'HP: ' + item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>{'Encum: ' + item.encumbrance}</Text>
          <Text color={theme.text}>{'Speed: ' + item.speed}</Text>
        </VStack>
      </HStack>
    </VStack>
  );

  const mid_hidden = (
    <VStack>
      <VStack>
        <HStack flex={1}>
          <Text color={theme.text}>{'Manufacturer: '}</Text>
          <Text color={theme.text} flexWrap={'wrap'} flex={1}>
            {dbState.vehicles.manufacturers[item.manufacturer].name}
          </Text>
        </HStack>
        <HStack flex={1}>
          <Text color={theme.text}>{'Model: '}</Text>
          <Text color={theme.text} flexWrap={'wrap'} flex={1}>
            {item.model}
          </Text>
        </HStack>
      </VStack>
      <HStack space={3}>
        <VStack>
          <Text color={theme.text}>{'SST: ' + item.sst}</Text>
          <Text color={theme.text}>{'Weapons: ' + item.weapons}</Text>
          <Text color={theme.text}>{'Defense: ' + item.defense}</Text>
          <Text color={theme.text}>{'Crew: ' + item.crew}</Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>{'HTT: ' + item.htt}</Text>
          <Text color={theme.text}>{'Armor: ' + item.armor}</Text>
          <Text color={theme.text}>{'Passengers: ' + item.passengers}</Text>
          <HStack>
            <Text color={theme.text}>{'Sensors: '}</Text>
            <Text color={theme.text}>
              {dbState.vehicles.sensors[item.sensors].name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );

  return <ItemComponent item={item} top={top} mid_hidden={mid_hidden} />;
});
