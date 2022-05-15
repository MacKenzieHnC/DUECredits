import {HStack, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const StarshipItemComponent = memo(({item}) => {
  const {data: dbState, isLoading} = useGetDBStateQuery();
  // Stylize
  const theme = useTheme();
  if (isLoading || !dbState) {
    return <></>;
  }

  return (
    <ItemComponent item={item}>
      <HStack space={3}>
        <Text color={theme.text}>HP: {item.hardpoints}</Text>
        <Text color={theme.text}>Encum: {item.encumbrance}</Text>
      </HStack>

      {item.additional_rules && (
        <VStack flex={1}>
          <Text color={theme.text}>
            {'Additional Rules: ' +
              item.additional_rules
                .map(
                  rule =>
                    dbState.additional_rules.find(x => x.id === rule.id).name + // Won't be undefined or should fail
                    (rule.modifier !== '' ? ': ' + rule.modifier : ''),
                )
                .join(', ')}
          </Text>
        </VStack>
      )}
    </ItemComponent>
  );
});
