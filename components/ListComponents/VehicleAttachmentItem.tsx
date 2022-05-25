import {HStack, Text} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent, ItemTypeProps} from './Item';

export const VehicleAttachmentItemComponent = ({item}: ItemTypeProps) => {
  // Stylize
  const theme = useTheme();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  const top = useMemo(() => {
    return (
      <HStack space={3}>
        <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>
      </HStack>
    );
  }, [item.hardpoints, theme.colors.text]);

  return (
    <ItemComponent
      item={item}
      top={top}
      editMode={editMode}
      setEditMode={setEditMode}
      setEditItem={setEditItem}
    />
  );
};
