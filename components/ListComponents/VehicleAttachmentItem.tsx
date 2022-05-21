import {HStack, Text} from 'native-base';
import React, {memo} from 'react';
import {useTheme} from '../Theme';
import {ItemComponent} from './Item';

export const VehicleAttachmentItemComponent = memo(({item}: any) => {
  // Stylize
  const theme = useTheme();

  const top = (
    <HStack space={3}>
      <Text color={theme.colors.text}>HP: {item.hardpoints}</Text>
    </HStack>
  );

  return <ItemComponent item={item} top={top} />;
});
