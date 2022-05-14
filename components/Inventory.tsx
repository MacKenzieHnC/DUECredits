import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {useGetDBStateQuery} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {ArmorInventory} from '../screens/Inventory/ArmorInventory';
import {AttachmentInventory} from '../screens/Inventory/AttachmentInventory';
import {GearInventory} from '../screens/Inventory/GearInventory';
import {PlanetaryVehicleInventory} from '../screens/Inventory/PlanetaryVehicleInventory';
import {StarshipInventory} from '../screens/Inventory/StarshipsInventory';
import {VehicleAttachmentsInventory} from '../screens/Inventory/VehicleAttachmentsInventory';
import {VehicleWeaponsInventory} from '../screens/Inventory/VehicleWeaponsInventory';
import {WeaponInventory} from '../screens/Inventory/WeaponInventory';
import {GenerateShopButton} from './GenerateInventoryButton';

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
      <Drawer.Screen name={'Armor'} component={ArmorInventory} />
      <Drawer.Screen name={'Attachments'} component={AttachmentInventory} />
      <Drawer.Screen name={'Gear'} component={GearInventory} />
      <Drawer.Screen
        name={'Planetary Vehicles'}
        component={PlanetaryVehicleInventory}
      />
      <Drawer.Screen name={'Starships'} component={StarshipInventory} />
      <Drawer.Screen
        name={'Vehicle Attachments'}
        component={VehicleAttachmentsInventory}
      />
      <Drawer.Screen
        name={'Vehicle Weapons'}
        component={VehicleWeaponsInventory}
      />
      <Drawer.Screen name={'Weapons'} component={WeaponInventory} />
    </Drawer.Navigator>
  );
};
