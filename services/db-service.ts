import {DBState, CategoryLike, Rulebook} from '../models/ItemIndex';
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

export const extractItemProps = (item: any) => {
  const sources = item.sources.split(',').map((source: string) => {
    const final = source.split(':');
    return {rulebook: final[0], page: final[1]};
  });
  return {
    id: item.id,
    restricted: item.restricted,
    item_type: item.item_type,
    name: item.name,
    price: item.price,
    rarity: item.rarity,
    notes: item.notes,
    unique: item.is_unique,
    sources: sources,
  };
};

export const getCategoryList = async (
  db: SQLite.SQLiteDatabase,
  tableName: string,
  orderBy: string | undefined,
) => {
  try {
    const list: CategoryLike[] = [];
    var results = await db.executeSql(
      `SELECT *
      FROM ${tableName}
      ${orderBy ? ' ORDER BY ' + orderBy : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          item: item.item,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get' + tableName + ' items !!!');
  }
};

const getRulebooks = async (db: SQLiteDatabase): Promise<Rulebook[]> => {
  try {
    const list: Rulebook[] = [];
    var results = await db.executeSql(
      `SELECT *
      FROM Rulebooks
       ORDER BY item`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          item: item.item,
          abbrev: item.abbrev,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Rulebooks !!!');
  }
};

export const getDBState = async (db: SQLiteDatabase): Promise<DBState> => {
  try {
    const rulebooks = await getRulebooks(db);
    const weapons = await getDBWeaponsState(db);
    return {
      rulebooks: rulebooks,
      weapons: weapons,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
