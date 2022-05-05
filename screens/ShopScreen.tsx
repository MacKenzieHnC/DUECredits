import {Button, View, VStack} from 'native-base';
import React from 'react';

export const ShopScreen = ({navigation}) => {
  const goTo = (page: string) => {
    navigation.navigate(page);
  };
  return (
    <View>
      <VStack space={5}>
        <Button onPress={() => goTo('Inventory')}>Go To Inventory!</Button>
        <Button onPress={() => goTo('Options')}>Go To Options!</Button>
      </VStack>
    </View>
  );
};
