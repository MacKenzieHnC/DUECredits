import {Box, HStack, VStack, Text} from 'native-base';
import React from 'react';
import {
  ArmorItem,
  AttachmentItem,
  GearItem,
  PlanetaryVehicleItem,
  StarshipItem,
  VehicleAttachmentItem,
  VehicleWeaponItem,
  WeaponItem,
} from '../models/ItemIndex';

interface ItemProps {
  item:
    | ArmorItem
    | AttachmentItem
    | GearItem
    | StarshipItem
    | PlanetaryVehicleItem
    | VehicleAttachmentItem
    | VehicleWeaponItem
    | WeaponItem;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.itemProps.restricted;

  return (
    <Box maxWidth="100%" p={5} rounded="md" backgroundColor="primary.900" m={2}>
      <HStack alignItems="center">
        <VStack space={2} flex={1}>
          <Text color="white" flexWrap={'wrap'}>
            {isRestricted ? '(R) ' : ''}
            {item.itemProps.name}
          </Text>
          {children}
        </VStack>
        <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
          <Text color="white">Price: {item.itemProps.price}</Text>
        </Box>
      </HStack>
      {!!item.itemProps.notes && (
        <Box>
          <Text color="white">Notes: {item.itemProps.notes}</Text>
        </Box>
      )}
    </Box>
  );
};
