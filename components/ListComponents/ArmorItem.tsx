import {HStack, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent, ItemTypeProps} from './Item';

export const ArmorItemComponent = ({item}: ItemTypeProps) => {
  // Stylize
  const theme = useTheme();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  const mid = useMemo(() => {
    return (
      <HStack space={3}>
        <VStack>
          <Text color={theme.colors.text}>Def: {item.defense}</Text>
          <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>
        </VStack>
        <VStack>
          <Text color={theme.colors.text}>Soak: {item.soak}</Text>
          <Text color={theme.colors.text}>Encum: {item.encumbrance}</Text>
        </VStack>
      </HStack>
    );
  }, [
    item.defense,
    item.encumbrance,
    item.hardpoints,
    item.soak,
    theme.colors.text,
  ]);

  return (
    <ItemComponent
      item={item}
      mid={mid}
      editMode={false}
      setEditMode={setEditMode}
      setEditItem={setEditItem}
    />
  );
};
