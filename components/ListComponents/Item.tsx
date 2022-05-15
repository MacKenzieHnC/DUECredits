import {Box, HStack, VStack, Text, Modal} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../Theme';

interface ItemProps {
  item: any;
  children: React.ReactNode;
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.restricted;

  // Stylize
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(!open)}>
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
      </TouchableOpacity>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <Modal.Content maxWidth="350" backgroundColor={theme.bg}>
          <Modal.CloseButton />
          <Modal.Header style={{backgroundColor: theme.card}}>
            <Text color={theme.text}>{item.name}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text color={theme.text}>Hi!</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
