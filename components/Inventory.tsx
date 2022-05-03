import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';

import {ArmorInventory} from '../screens/ArmorInventory';
import {WeaponInventory} from '../screens/WeaponInventory';
import {
  fetchWeaponCategoriesAsync,
  selectWeaponCategories,
} from '../store/slices/weaponCategorySlice';

const Drawer = createDrawerNavigator();

export const Inventory = () => {
  const dispatch = useAppDispatch();
  const weaponCategoriesStatus = useAppSelector(
    state => state.weaponCategories.status,
  );
  const weaponCategories = useAppSelector(selectWeaponCategories);

  useEffect(() => {
    if (weaponCategoriesStatus === 'idle' && weaponCategories === null) {
      dispatch(fetchWeaponCategoriesAsync());
    }
  }, [weaponCategoriesStatus, dispatch, weaponCategories]);

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
