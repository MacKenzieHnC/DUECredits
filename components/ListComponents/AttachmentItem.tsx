import {HStack, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent, ItemTypeProps} from './Item';

export const AttachmentItemComponent = ({item, groupBy}: ItemTypeProps) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  const top = useMemo(() => {
    return (
      dbState && (
        <VStack>
          {!editMode && groupBy !== 'category' && (
            <HStack>
              <Text color={theme.colors.text}>{'Category: '}</Text>
              <Text color={theme.colors.text}>
                {dbState.attachments.category[item.category].name}
              </Text>
            </HStack>
          )}
          <HStack space={3}>
            <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>
            <Text color={theme.colors.text}>Encum: {item.encumbrance}</Text>
          </HStack>
        </VStack>
      )
    );
  }, [
    dbState,
    editMode,
    groupBy,
    item.category,
    item.encumbrance,
    item.hardpoints,
    theme.colors.text,
  ]);

  if (isLoading || !dbState) {
    return <></>;
  }
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
