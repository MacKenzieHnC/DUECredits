import {Item, DBState} from '../models/ItemIndex';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBWeaponsState} from './db-service-weapons';

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: 'SWRPG.db',
    location: 'default',
    createFromLocation: 1,
  });
};

SQLite.enablePromise(true);

export const getItems = async (
  db: SQLite.SQLiteDatabase,
  itemType: number,
  parentTable: String,
): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql(
      `SELECT i.restricted as restricted,
          i.name as name,
          i.price as price,
          i.rarity as rarity,
          i.notes as notes,
          i.is_unique as is_unique 
        ${
          parentTable === 'Items'
            ? 'FROM ITEMS i '
            : `FROM ${parentTable} AS pt JOIN ITEMS i ON pt.id = i.id `
        } 
          JOIN Item_Types AS it on i.Type = it.id
          WHERE i.Type = ${itemType}`,
    );
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

export const getDBState = async (db: SQLiteDatabase): Promise<DBState> => {
  try {
    const weapons = await getDBWeaponsState(db);
    return {weapons: weapons};
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
