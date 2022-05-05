import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'native-base';
import {Inventory} from './Inventory';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShopOptionsComponent} from './options/ShopOptions';
import {ShopScreen} from '../screens/ShopScreen';

export const ShopComponent = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View flex={1}>
      <Stack.Navigator>
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Options" component={ShopOptionsComponent} />
        <Stack.Screen name="Inventory" component={Inventory} />
      </Stack.Navigator>
    </View>
  );
};
