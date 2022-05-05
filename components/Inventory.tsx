import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {ArmorInventory} from '../screens/ArmorInventory';
import {WeaponInventory} from '../screens/WeaponInventory';

const Drawer = createDrawerNavigator();

export const Inventory = () => {
  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed">
      <Drawer.Screen name={'Armor'} component={ArmorInventory} />
      <Drawer.Screen name={'Weapons'} component={WeaponInventory} />
    </Drawer.Navigator>
  );
};
