import {Box, HStack, VStack, Text, Spacer} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native-windows';
import {ArmorItem, WeaponItem} from '../models/ItemIndex';

interface ItemProps {
  item: ArmorItem | WeaponItem;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.itemProps.restricted;

  return (
    <Box maxWidth="100%" p={5} rounded="md" backgroundColor="primary.900" m={2}>
      <HStack alignItems="center">
        <VStack space={2} style={styles.nameContainer}>
          <Text color="white" style={styles.nameText}>
            {isRestricted ? '(R) ' : ''}
            {item.itemProps.name}
          </Text>
          {children}
        </VStack>
        <Box style={styles.priceContainer}>
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

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 150,
    backgroundColor: 'red',
  },
  nameContainer: {flex: 1},
  nameText: {flexWrap: 'wrap'},
});
