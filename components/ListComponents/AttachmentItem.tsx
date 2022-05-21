import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const AttachmentItemComponent = memo(({item, groupBy}: any) => {
  // Stylize
  const theme = useTheme();
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState) {
    return <></>;
  }

  const top = (
    <VStack>
      <HStack>
        <Text color={theme.colors.text}>{'Category: '}</Text>
        <Text color={theme.colors.text}>
          {groupBy !== 'category' &&
            dbState.attachments.category[item.category].name}
        </Text>
      </HStack>
      <HStack space={3}>
        <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>
        <Text color={theme.colors.text}>Encum: {item.encumbrance}</Text>
      </HStack>
    </VStack>
  );

  return <ItemComponent item={item} top={top} />;
});
