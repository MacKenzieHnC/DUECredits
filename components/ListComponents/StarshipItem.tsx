import {HStack, Text, VStack} from 'native-base';
import React, {memo, useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Special, WeaponEffect} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const StarshipItemComponent = memo(({item}) => {
  // Stylize
  const theme = useTheme();
  const [allowClickthrough, setAllowClickthrough] = useState(false);
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
          <Text color={theme.text}>
            {'Encum: ' + item.encumbrance.toLocaleString()}
          </Text>
          <Text color={theme.text}>{'Speed: ' + item.speed}</Text>
        </VStack>
      </HStack>
    </VStack>
  );

  const mid_hidden = (
    <VStack space={3}>
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
          <Text color={theme.text}>
            {'Crew: ' + item.crew.toLocaleString()}
          </Text>
        </VStack>
        <VStack>
          <Text color={theme.text}>{'HTT: ' + item.htt}</Text>
          <Text color={theme.text}>{'Armor: ' + item.armor}</Text>
          <Text color={theme.text}>
            {'Passengers: ' + item.passengers.toLocaleString()}
          </Text>
          <HStack>
            <Text color={theme.text}>{'Sensors: '}</Text>
            <Text color={theme.text}>
              {dbState.vehicles.sensors[item.sensors].name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text color={theme.text}>{'Hyperdrive: ' + item.hyperdrive}</Text>
      <Text color={theme.text}>{'Navicomputer: ' + item.navicomputer}</Text>
    </VStack>
  );

  const bottom = item.additional_rules && (
    <HStack>
      <Text color={theme.text}>{'Effects: '}</Text>
      <HStack flexWrap={'wrap'} flex={1}>
        {item.additional_rules.map((rule: Special, index: number) => {
          const dbRule = dbState.additional_rules.find(
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
