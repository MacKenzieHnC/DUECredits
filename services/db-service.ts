import {Item} from '../models';
import SQLite from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'SWRPG.db', createFromLocation : '~www/SWRPG.db'});
};

SQLite.enablePromise(true);

const tableName = 'ARMOR'

export const getItems = async (db: SQLite.SQLiteDatabase): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql(
        `SELECT key as key, 
          restricted as restricted,
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

