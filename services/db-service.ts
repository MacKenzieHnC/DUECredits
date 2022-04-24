import {Item, ArmorItem} from '../models';
import SQLite from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'SWRPG.db', createFromLocation : 1});
};

SQLite.enablePromise(true);

const getItems = async (db: SQLite.SQLiteDatabase, tableName:String): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql(
        `SELECT item_type as item_type,
          restricted as restricted,
          name as name,
          price as price,
          rarity as rarity,
          notes as notes,
          is_unique as is_unique
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


export const getArmorItems = async (db: SQLite.SQLiteDatabase, tableName: String): Promise<ArmorItem[]> => {
  try {
    const itemProps = await getItems(db, tableName);
    const items: ArmorItem[] = [];
    const results = await db.executeSql(
        `SELECT key as key,
          defense as defense, 
          soak as soak,
          encumbrance as encumbrance,
          hardpoints as hardpoints
      FROM Armor`);
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
