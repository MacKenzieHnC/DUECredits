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
          borderWidth={1}>
          <VStack space={5} flex={1}>
            <HStack alignItems="center">
              <VStack space={2} flex={1}>
                <Text color={theme.text} flexWrap={'wrap'}>
                  {isRestricted ? '(R) ' : ''}
                  {item.name}
                </Text>
                {children.length > 1 ? children[0] : children}
              </VStack>
              <Box
                flexDirection={'row'}
                justifyContent={'flex-end'}
                width={150}>
                <Text color={theme.text}>Price: {item.price}</Text>
              </Box>
            </HStack>
            {children.length > 1 && children.slice(1)}
            {!!item.notes && (
              <Box>
                <Text color={theme.text}>Notes: {item.notes}</Text>
              </Box>
            )}
          </VStack>
        </Box>
      </TouchableOpacity>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <Modal.Content maxWidth="350" backgroundColor={theme.bg}>
          <Modal.CloseButton />
          <Modal.Header style={{backgroundColor: theme.card}}>
            <Text color={theme.text}>{item.name}</Text>
          </Modal.Header>
          <Modal.Body>
            <>
              <Text
                color={theme.text}
                borderColor={theme.border}
                borderLeftWidth={1}
                paddingLeft={1}>
                Sources
              </Text>
              <Divider />
              {item.rulebooks.map(source => (
                <Text color={theme.text}>
                  {dbState.rulebooks.find(x => x.id === source.id).name + // Won't be undefined or should fail
                    ': ' +
                    source.modifier}
                </Text>
              ))}
            </>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};
