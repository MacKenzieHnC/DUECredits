import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const GearItemComponent = memo(({item, groupBy}: any) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState) {
    return <></>;
  }

  const top = (
    <VStack>
      <HStack>
        <Text color={theme.text}>{'Category: '}</Text>
        <Text color={theme.text}>
          {groupBy !== 'category' && dbState.gear.category[item.category].name}
        </Text>
      </HStack>
      <Text color={theme.text}>Encum: {item.encumbrance}</Text>
    </VStack>
  );

  return <ItemComponent item={item} top={top} />;
});
