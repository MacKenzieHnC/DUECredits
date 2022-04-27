import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ArmorList, WeaponsList} from '../models';
import {
  getDBConnection,
  getArmorItems,
  getWeaponItems,
} from '../services/db-service';
import {ShopIndex} from './ShopIndex';
import {NavigationContainer} from '@react-navigation/native';
import {ItemList} from './ItemList';

export const Shop = ({shopTableName}: {shopTableName: String}) => {
  const [armorItems, setArmorItems] = useState<ArmorList>();
  const [weaponItems, setWeaponItems] = useState<WeaponsList>();
  const Drawer = createDrawerNavigator();
  const loadDataCallback = useCallback(async () => {
    try {
      // Begin database calls
      const db = await getDBConnection();

      // Armor
      const storedArmorItems = await getArmorItems(db, shopTableName);
      setArmorItems(storedArmorItems);

      // Weapons
      const storedWeaponItems = await getWeaponItems(db, shopTableName);
      setWeaponItems(storedWeaponItems);

      // End database calls
    } catch (error) {
      console.error(error);
    }
  }, [shopTableName]);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Armor">
        <Drawer.Screen name={'Armor'}>
          {props => <ItemList {...props} items={armorItems} />}
        </Drawer.Screen>
        <Drawer.Screen name={'Weapons'}>
          {props => <ItemList {...props} items={weaponItems} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shopContainerView: {flex: 1, flexDirection: 'row'},
});
