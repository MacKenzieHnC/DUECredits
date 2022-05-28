import {
  Box,
  HStack,
  VStack,
  Text,
  Modal,
  View,
  Card,
  Spacer,
  Button,
} from 'native-base';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CategoryLike, Special} from '../../models/ItemIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {NumericField} from '../FieldComponents/NumericField';
import {TextField} from '../FieldComponents/TextField';
import {useTheme} from '../Theme';

export type ItemTypeProps = {
  item: any;
  groupBy?: any;
};

type ItemProps = ItemTypeProps & {
  top?: React.ReactNode;
  top_hidden?: React.ReactNode;
  mid?: React.ReactNode;
  mid_hidden?: React.ReactNode;
  bottom?: React.ReactNode;
  bottom_hidden?: React.ReactNode;
  setAllowClickthrough?: Function;
  editMode: boolean;
  setEditMode: Function;
  setEditItem: Function;
};

export const ItemComponent = ({
  item,
  top,
  top_hidden,
  mid,
  mid_hidden,
  bottom,
  bottom_hidden,
  setAllowClickthrough,
  setEditItem,
  editMode,
  setEditMode,
}: ItemProps) => {
  const isRestricted = item.restricted;

  // Stylize
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {data: dbState, isLoading} = useGetDBStateQuery();

  ////////////////////////////////
  //
  //  Field components
  //
  ////////////////////////////////
  const name_and_restricted = useMemo(() => {
    return (
      <Text color={theme.colors.text} flexWrap={'wrap'}>
        {isRestricted ? '(R) ' : ''}
        {item.name}
      </Text>
    );
  }, [isRestricted, item.name, theme.colors.text]);

  const price = useMemo(() => {
    return (
      <NumericField
        title={'Price'}
        value={item.price}
        editMode={editMode}
        setValue={(value: number) => setEditItem({...item, price: value})}
      />
    );
  }, [editMode, item, setEditItem]);

  const notes = useMemo(() => {
    return (
      <TextField
        title={'Notes'}
        value={item.notes}
        editMode={editMode}
        setValue={(value: string) => setEditItem({...item, notes: value})}
      />
    );
  }, [editMode, item, setEditItem]);

  const rarity = useMemo(() => {
    return (
      <NumericField
        title={'Rarity'}
        value={item.rarity}
        editMode={editMode}
        setValue={(value: number) => setEditItem({...item, rarity: value})}
      />
    );
  }, [editMode, item, setEditItem]);

  const rulebooks = useMemo(() => {
    return (
      dbState && (
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
      )
    );
  }, [dbState, item.rulebooks, theme.colors.text]);

  ////////////////////////////////
  //
  //  Card components
  //
  ////////////////////////////////
  const modal = false;
  const getContent = useMemo(() => {
    return (
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
    );
  }, [
    bottom,
    bottom_hidden,
    item,
    mid,
    mid_hidden,
    modal,
    name_and_restricted,
    notes,
    price,
    rarity,
    rulebooks,
    top,
    top_hidden,
  ]);

  if (isLoading || !dbState) {
    return <></>;
  }

  const beginEditMode = () => {
    setEditMode(true);
    setEditItem(item);
  };

  const endEditMode = () => {
    setEditMode(false);
    setEditItem({});
  };

  return (
    <Card key={item.id} bg={theme.colors.card}>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
          setAllowClickthrough && setAllowClickthrough(true);
        }}>
        {getContent}
      </TouchableOpacity>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setAllowClickthrough && setAllowClickthrough(false);
          endEditMode();
        }}
        size={'xl'}>
        <Modal.Content
          maxWidth="350"
          backgroundColor={theme.colors.background}
          borderColor={theme.colors.border}
          borderWidth={1}
          rounded={'sm'}>
          <Modal.Header style={{backgroundColor: theme.colors.card}}>
            <HStack>
              <Text color={theme.colors.text}>{item.name}</Text>
              <Spacer />
              {!editMode && (
                <Button onPress={() => beginEditMode()}>Edit</Button>
              )}
            </HStack>
          </Modal.Header>
          <Modal.Body>{getContent}</Modal.Body>
        </Modal.Content>
      </Modal>
    </Card>
  );
};
