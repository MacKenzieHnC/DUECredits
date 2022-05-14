import {Box, HStack, VStack, Text} from 'native-base';
import React from 'react';

interface ItemProps {
  item: any;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.restricted;

  return (
    <Box maxWidth="100%" p={5} rounded="md" backgroundColor="primary.900" m={2}>
      <HStack alignItems="center">
        <VStack space={2} flex={1}>
          <Text color="white" flexWrap={'wrap'}>
            {isRestricted ? '(R) ' : ''}
            {item.name}
          </Text>
          {children}
        </VStack>
        <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
          <Text color="white">Price: {item.price}</Text>
        </Box>
      </HStack>
      {!!item.notes && (
        <Box>
          <Text color="white">Notes: {item.notes}</Text>
        </Box>
      )}
    </Box>
  );
};
