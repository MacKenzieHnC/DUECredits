import {Button, VStack} from 'native-base';
import React from 'react';

export const ShopScreen = ({navigation}: any) => {
  return (
    <VStack space={5}>
      <Button onPress={() => navigation.navigate('Inventory')}>
        Go To Inventory!
      </Button>
      <Button onPress={() => navigation.navigate('Options')}>
        Go To Options!
      </Button>
    </VStack>
  );
};
