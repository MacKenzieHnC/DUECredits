import {Box, HStack, VStack, Text} from 'native-base';
import React from 'react';
import {ArmorItem, WeaponItem} from '../models/ItemIndex';

interface ItemProps {
  item: ArmorItem | WeaponItem;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.itemProps.restricted === 'TRUE';

  return (
    <Box width="100%" p={5} rounded="md" backgroundColor="primary.900" mb={2}>
      <VStack space={2}>
        <HStack justifyContent="space-between">
          <Text color="white">
            {isRestricted && '(R) '}
            {item.itemProps.name}
          </Text>
          <Text color="white">Price: {item.itemProps.price}</Text>
        </HStack>
        {children}
        {!!item.itemProps.notes && (
          <Box>
            <Text color="white">Notes: {item.itemProps.notes}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
