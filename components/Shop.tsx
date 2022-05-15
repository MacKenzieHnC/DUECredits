import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShopOptionsScreen} from '../screens/Options/ShopOptions';
import {Inventory} from './Inventory';
import {LoadShop} from '../screens/LoadShop';
import {ShopScreen} from '../screens/ShopScreen';
import {useAppSelector} from '../hooks/redux';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {useGetShopQuery} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';

export const ShopComponent = () => {
  const Stack = createNativeStackNavigator();
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  if (isLoadingShop || !shop) {
    return <LoadingScreen text="Loading Shop..." />;
  }
  return (
    <View flex={1}>
      <Stack.Navigator>
        <Stack.Screen name="Load Shop" component={LoadShop} />
        <Stack.Screen
          name="Shop Display"
          component={ShopScreen}
          options={{title: shop.name}}
        />
        <Stack.Screen
          name="Options"
          component={ShopOptionsScreen}
          options={{title: 'Options: ' + shop.name}}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{title: 'Inventory: ' + shop.name}}
        />
      </Stack.Navigator>
    </View>
  );
};
