import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShopOptionsScreen} from '../screens/Options/ShopOptions';
import {Inventory} from './Inventory';
import {LoadShop} from '../screens/LoadShop';
import {ShopScreen} from '../screens/ShopScreen';

export const ShopComponent = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View flex={1}>
      <Stack.Navigator>
        <Stack.Screen name="Load Shop" component={LoadShop} />
        <Stack.Screen name="Shop Display" component={ShopScreen} />
        <Stack.Screen name="Options" component={ShopOptionsScreen} />
        <Stack.Screen name="Inventory" component={Inventory} />
      </Stack.Navigator>
    </View>
  );
};
