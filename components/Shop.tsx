import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'native-base';
import {Inventory} from './Inventory';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShopScreen} from '../screens/ShopScreen';
import {ShopOptionsScreen} from '../screens/Options/ShopOptions';
import {LoadingScreen} from './LoadingScreen';
import {useGetAllShopsQuery} from '../store/slices/databaseSlice';

export const ShopComponent = () => {
  const Stack = createNativeStackNavigator();
  const {data: shop, isLoading} = useGetAllShopsQuery();
  if (isLoading || !shop) {
    return <LoadingScreen text="Initializing DB..." />;
  }

  return (
    <View flex={1}>
      <Stack.Navigator>
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Options" component={ShopOptionsScreen} />
        <Stack.Screen name="Inventory" component={Inventory} />
      </Stack.Navigator>
    </View>
  );
};
