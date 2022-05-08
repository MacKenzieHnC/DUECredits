import {Button, View, VStack} from 'native-base';
import React from 'react';

export const ShopScreen = ({navigation}: any) => {
  return (
    <View>
      <VStack space={5}>
        <Button onPress={() => navigation.navigate('Inventory')}>
          Go To Inventory!
        </Button>
        <Button onPress={() => navigation.navigate('Options')}>
          Go To Options!
        </Button>
      </VStack>
    </View>
  );
};
