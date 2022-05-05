import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {ArmorInventory} from '../screens/ArmorInventory';
import {AttachmentInventory} from '../screens/AttachmentInventory';
import {GearInventory} from '../screens/GearInventory';
import {StarshipInventory} from '../screens/StarshipsInventory';
import {PlanetaryVehicleInventory} from '../screens/PlanetaryVehicleInventory';
import {VehicleAttachmentsInventory} from '../screens/VehicleAttachmentsInventory';
import {WeaponInventory} from '../screens/WeaponInventory';
import {VehicleWeaponsInventory} from '../screens/VehicleWeaponsInventory';

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
