import React, {useCallback, useEffect, useState} from 'react';
import {ArmorList} from '../models';
import {
  getDBConnection,
  getArmorItems,
  getWeaponItems,
} from '../services/db-service';
import {ItemList} from './ItemList';

export const Shop = ({shop}) => {
  const [armorItems, setArmorItems] = useState<ArmorList>();
  const [weaponItems, setWeaponItems] = useState<WeaponList>();
  const loadDataCallback = useCallback(async () => {
    try {
      // Begin database calls
      const db = await getDBConnection();

      // Armor
      const storedArmorItems = await getArmorItems(db, shop);
      setArmorItems(storedArmorItems);

      // Weapons
      const storedWeaponItems = await getWeaponItems(db, shop);
      setWeaponItems(storedWeaponItems);

      // End database calls
    } catch (error) {
      console.error(error);
    }
  }, [shop]);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const lists = [
    <ItemList items={armorItems} />,
    <ItemList items={weaponItems} />,
  ];
  return lists[0];
};
