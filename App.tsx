/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useCallback, useEffect, useState} from 'react';
import {
  useColorScheme,
} from 'react-native';
import { ItemList } from './components/ItemList';
import {ArmorItem} from './models';
import {getDBConnection, getArmorItems} from './services/db-service';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [armorItems, setArmorItems] = useState<ArmorItem[]>([]);
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedArmorItems = await getArmorItems(db);
      if (storedArmorItems.length) {
        setArmorItems(storedArmorItems);
      } else {
        throw Error('List empty!!!!');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <ItemList items={armorItems} itemType = {'ARMOR'}/>
  );
};

export default App;
