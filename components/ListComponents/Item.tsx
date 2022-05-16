import {Box, HStack, VStack, Text, Modal, Divider, View} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';

interface ItemProps {
  item: any;
  children: React.ReactNode[];
}

export const ItemComponent = ({item, children}: ItemProps) => {
  const isRestricted = item.restricted;

  // Stylize
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState) {
    return <></>;
  }

  const getContent = (modal: boolean) => {
    return (
      <VStack space={5} flex={1}>
        <HStack alignItems="center">
          <VStack space={2} flex={1}>
            {!modal && (
              <Text color={theme.text} flexWrap={'wrap'}>
                {isRestricted ? '(R) ' : ''}
                {item.name}
              </Text>
            )}
            {children.length > 1 ? children[0] : children}
          </VStack>
          <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
            <Text color={theme.text}>Price: {item.price.toLocaleString()}</Text>
          </Box>
        </HStack>
        {children.length > 1 && children.slice(1)}
        {!!item.notes && (
          <Text color={theme.text} width="100%">
            Notes: {item.notes}
          </Text>
        )}
        {modal && (
          <View>
            <Text underline color={theme.text}>
              Sources:
            </Text>
            {item.rulebooks.map(source => (
              <Text color={theme.text}>
                {dbState.rulebooks.find(x => x.id === source.id).name + // Won't be undefined or should fail
                  ': ' +
                  source.modifier}
              </Text>
            ))}
          </View>
        )}
      </VStack>
    );
  };

  return (
    <View key={item.id}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Box
          maxWidth="100%"
          p={5}
          rounded="md"
          backgroundColor={theme.card}
          m={2}
          borderColor={theme.border}
          borderWidth={1}
          overflow={'hidden'}>
          {getContent(false)}
        </Box>
      </TouchableOpacity>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
        <Modal.Content maxWidth="350" backgroundColor={theme.bg}>
          <Modal.Header style={{backgroundColor: theme.card}}>
            <Text color={theme.text}>{item.name}</Text>
          </Modal.Header>
          <Modal.Body>{getContent(true)}</Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};
