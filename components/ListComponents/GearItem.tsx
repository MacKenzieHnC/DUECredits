import {HStack, Text, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent, ItemTypeProps} from './Item';

export const GearItemComponent = ({item, groupBy}: ItemTypeProps) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
  const [editItem, setEditItem] = useState({});
  const [editMode, setEditMode] = useState(false);

  const top = useMemo(() => {
    return (
      dbState && (
        <VStack>
          <HStack>
            <Text color={theme.colors.text}>{'Category: '}</Text>
            <Text color={theme.colors.text}>
              {groupBy !== 'category' &&
                dbState.gear.category[item.category].name}
            </Text>
          </HStack>
          <Text color={theme.colors.text}>Encum: {item.encumbrance}</Text>
        </VStack>
      )
    );
  }, [dbState, groupBy, item.category, item.encumbrance, theme.colors.text]);

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
