import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {ArmorInventory} from '../screens/Inventory/ArmorInventory';
import {AttachmentInventory} from '../screens/Inventory/AttachmentInventory';
import {GearInventory} from '../screens/Inventory/GearInventory';
import {StarshipInventory} from '../screens/Inventory/StarshipsInventory';
import {PlanetaryVehicleInventory} from '../screens/Inventory/PlanetaryVehicleInventory';
import {VehicleAttachmentsInventory} from '../screens/Inventory/VehicleAttachmentsInventory';
import {WeaponInventory} from '../screens/Inventory/WeaponInventory';
import {VehicleWeaponsInventory} from '../screens/Inventory/VehicleWeaponsInventory';

const Drawer = createDrawerNavigator();

export const Inventory = () => {
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
