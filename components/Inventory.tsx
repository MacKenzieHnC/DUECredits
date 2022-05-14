import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {
  useGetInventoryQuery,
  useGetShopQuery,
} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {GenerateShopButton} from './GenerateInventoryButton';
import {ItemScreen} from '../screens/ItemScreen';
import {Shop} from '../models/InventoryOptionsIndex';
import {useAppSelector} from '../hooks/redux';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {ITEM_TYPE} from '../models/ItemIndex';

const Drawer = createDrawerNavigator();

export const Inventory = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data, isLoading} = useGetInventoryQuery(shop as Shop);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <GenerateShopButton />,
    });
  }, [navigation]);
  if (isLoading || !data || isLoadingShop || !shop) {
    return <LoadingScreen text="Loading shop" />;
  }

  const screens = ITEM_TYPE.map((itemType, index) => {
    console.log('updating screens');
    return data[index].length > 0 ? (
      <Drawer.Screen
        name={itemType.name}
        component={ItemScreen}
        initialParams={{key: itemType.key}}
      />
    ) : null;
  });

  return screens.some(x => x !== null) ? (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed">
      {screens}
    </Drawer.Navigator>
  ) : (
    <LoadingScreen text="No items yet!" />
  );
};
