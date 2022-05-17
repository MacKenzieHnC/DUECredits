import {Box, HStack, VStack, Text, Modal, View} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Special} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';

interface ItemProps {
  item: any;
  top?: React.ReactNode;
  top_hidden?: React.ReactNode;
  mid?: React.ReactNode;
  mid_hidden?: React.ReactNode;
  bottom?: React.ReactNode;
  bottom_hidden?: React.ReactNode;
  setAllowClickthrough?: Function;
}

export const ItemComponent = ({
  item,
  top,
  top_hidden,
  mid,
  mid_hidden,
  bottom,
  bottom_hidden,
  setAllowClickthrough,
}: ItemProps) => {
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
        {modal && top_hidden}
        <HStack alignItems="center">
          <VStack space={2} flex={1}>
            {!modal ? (
              <Text color={theme.text} flexWrap={'wrap'}>
                {isRestricted ? '(R) ' : ''}
                {item.name}
              </Text>
            ) : (
              <Text color={theme.text} flexWrap={'wrap'}>
                {'Rarity: ' + item.rarity}
              </Text>
            )}
            {top}
          </VStack>
          <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
            <Text color={theme.text}>Price: {item.price.toLocaleString()}</Text>
          </Box>
        </HStack>
        {mid}
        {modal && mid_hidden}
        {bottom}
        {modal && bottom_hidden}
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
            {item.rulebooks.map((source: Special) => (
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
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
          setAllowClickthrough && setAllowClickthrough(true);
        }}>
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
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setAllowClickthrough && setAllowClickthrough(false);
        }}
        size={'xl'}>
        <Modal.Content
          maxWidth="350"
          backgroundColor={theme.bg}
          borderColor={theme.border}
          borderWidth={1}
          rounded={'sm'}>
          <Modal.Header style={{backgroundColor: theme.card}}>
            <Text color={theme.text}>{item.name}</Text>
          </Modal.Header>
          <Modal.Body>{getContent(true)}</Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};
