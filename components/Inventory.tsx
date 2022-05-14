import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {useGetDBStateQuery} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {GenerateShopButton} from './GenerateInventoryButton';
import {ITEM_TYPE} from '../constants/enum';
import {ItemScreen} from '../screens/Inventory/ItemScreen';

const Drawer = createDrawerNavigator();

export const Inventory = ({navigation}: any) => {
  //Initialize
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <GenerateShopButton />,
    });
  }, [navigation]);
  if (isLoadingDB || !dbState) {
    return <LoadingScreen text="Loading shop" />;
  }
  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed">
      {ITEM_TYPE.map(itemType => {
        return (
          <Drawer.Screen
            name={itemType.name}
            component={ItemScreen}
            initialParams={{key: itemType.key}}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
