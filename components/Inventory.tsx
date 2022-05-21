import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {
  useGetInventoryQuery,
  useGetShopQuery,
} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {GenerateShopButton} from './GenerateInventoryButton';
import {ItemScreen} from '../screens/ItemScreen';
import {useAppSelector} from '../hooks/redux';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {ITEM_TYPE} from '../models/ItemIndex';
import {useTheme} from './Theme';
import {Text, View} from 'native-base';
import {useGetInventoryProps} from '../hooks/InventoryProps';

const Drawer = createDrawerNavigator();

export const Inventory = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: inventory, isLoading: isLoadingInventory} = useGetInventoryQuery(
    useGetInventoryProps(),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <GenerateShopButton />,
    });
  }, [navigation]);

  // Stylize
  const theme = useTheme();

  if (isLoadingInventory || !inventory || isLoadingShop || !shop) {
    return <LoadingScreen text="Loading shop" />;
  }

  const screens = ITEM_TYPE.map((itemType, index) => {
    return (
      inventory[index].length > 0 && (
        <Drawer.Screen
          name={itemType.name}
          component={ItemScreen}
          initialParams={{key: itemType.key}}
        />
      )
    );
  });
  return screens.some(x => x) ? (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed"
      useLegacyImplementation={true}
      screenOptions={{headerTintColor: theme.colors.text}}>
      {screens}
    </Drawer.Navigator>
  ) : (
    <View
      flex={1}
      backgroundColor={theme.colors.background}
      alignItems={'center'}
      justifyContent={'center'}>
      <Text color={theme.colors.text}>No items yet!</Text>
    </View>
  );
};
