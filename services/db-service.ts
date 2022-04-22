import {Item, ArmorItem} from '../models';
import SQLite from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'SWRPG.db', createFromLocation : '~www/SWRPG.db'});
};

SQLite.enablePromise(true);

const getItems = async (db: SQLite.SQLiteDatabase, tableName:String): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql(
        `SELECT restricted as restricted,
          name as name,
          price as price,
          rarity as rarity,
          notes as notes
      FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};


export const getArmorItems = async (db: SQLite.SQLiteDatabase): Promise<ArmorItem[]> => {
  try {
    const tableName = 'ARMOR';
    const itemProps = await getItems(db, tableName);
    const items: ArmorItem[] = [];
    const results = await db.executeSql(
        `SELECT key as key,
          defense as defense, 
          soak as soak,
          encumbrance as encumbrance,
          hardpoints as hardpoints
      FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({itemProps : itemProps[index],
          key : item.key,
          defense : item.defense,
          soak : item.soak,
          encumbrance : item.encumbrance,
          hardpoints : item.hardpoints});
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};
