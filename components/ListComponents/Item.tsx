import {Box, HStack, VStack, Text, Modal, View, Card} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CategoryLike, Special} from '../../models/ItemIndex';
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

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const name_and_restricted = (
    <Text color={theme.colors.text} flexWrap={'wrap'}>
      {isRestricted ? '(R) ' : ''}
      {item.name}
    </Text>
  );
  const price = (
    <Box flexDirection={'row'} justifyContent={'flex-end'} width={150}>
      <Text color={theme.colors.text}>
        Price: {item.price.toLocaleString()}
      </Text>
    </Box>
  );
  const notes = (
    <Text color={theme.colors.text} width="100%">
      Notes: {item.notes}
    </Text>
  );
  const rarity = (
    <Text color={theme.colors.text} flexWrap={'wrap'}>
      {'Rarity: ' + item.rarity}
    </Text>
  );
  const rulebooks = (
    <View>
      <Text underline color={theme.colors.text}>
        Sources:
      </Text>
      {item.rulebooks.map((source: Special) => (
        <Text color={theme.colors.text}>
          {(dbState.rulebook.find(x => x.id === source.id) as CategoryLike)
            .name +
            ': ' +
            source.modifier}
        </Text>
      ))}
    </View>
  );

  ////////////////////////////////
  //
  //  Card components
  //
  ////////////////////////////////
  const getContent = (modal: boolean) => {
    return (
      <>
        <VStack space={5} flex={1}>
          {modal && top_hidden}
          <HStack alignItems="center">
            <VStack space={2} flex={1}>
              {!modal ? name_and_restricted : rarity}
              {top}
            </VStack>
            {price}
          </HStack>
          {mid}
          {modal && mid_hidden}
          {bottom}
          {modal && bottom_hidden}
          {!!item.notes && notes}
          {modal && rulebooks}
        </VStack>
      </>
    );
  };

  return (
    <Card key={item.id} bg={theme.colors.card}>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
          setAllowClickthrough && setAllowClickthrough(true);
        }}>
        {getContent(false)}
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
          backgroundColor={theme.colors.background}
          borderColor={theme.colors.border}
          borderWidth={1}
          rounded={'sm'}>
          <Modal.Header style={{backgroundColor: theme.colors.card}}>
            <Text color={theme.colors.text}>{item.name}</Text>
          </Modal.Header>
          <Modal.Body>{getContent(true)}</Modal.Body>
        </Modal.Content>
      </Modal>
    </Card>
  );
};
