import {Box, HStack, VStack, Text} from 'native-base';
import React from 'react';
import {useTheme} from '../Theme';

interface ItemProps {
  item: any;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.restricted;

  // Stylize
  const theme = useTheme();

  return (
    <Box
      maxWidth="100%"
      p={5}
      rounded="md"
      backgroundColor={theme.card}
      m={2}
      borderColor={theme.border}
      borderWidth={1}>
      <HStack alignItems="center">
        <VStack space={2} flex={1}>
          <Text color={theme.text} flexWrap={'wrap'}>
            {isRestricted ? '(R) ' : ''}
            {item.name}
          </Text>
          {children}
        </VStack>
        <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
          <Text color={theme.text}>Price: {item.price}</Text>
        </Box>
      </HStack>
      {!!item.notes && (
        <Box>
          <Text color={theme.text}>Notes: {item.notes}</Text>
        </Box>
      )}
    </Box>
  );
};
