import {
  DBState,
  CategoryLike,
  AdditionalRule,
  Location,
  Rulebook,
} from '../models/ItemIndex';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBWeaponsState} from './db-service-weapons';
import {getDBAttachmentsState} from './db-service-attachments';
import {getDBGearState} from './db-service-gear';
import {getDBVehiclesState} from './db-service-vehicles';
import {ItemType, ITEM_TYPE} from '../constants/enum';

export const JSONToString = (someJSON: any) => {
  return JSON.stringify(someJSON, null, '\t').split('"').join("'");
};

export const StringToJSON = (someString: string) => {
  return JSON.parse(someString.split("'").join('"'));
};

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: 'SWRPG.db',
    location: 'default',
    createFromLocation: 1,
  });
};

SQLite.enablePromise(true);

export const extractSpecialProp = (prop: string) => {
  if (prop === undefined) {
    throw Error('Here!');
  }
  return prop.split(',').map((source: string) => {
    const final = source.split(':');
    return {id: parseInt(final[0], 10), modifier: final[1]};
  });
};

export const extractItemProps = (item: any) => {
  return {
    id: item.id,
    restricted: item.restricted,
    item_type: item.item_type,
    name: item.name,
    price: item.price,
    rarity: item.rarity,
    notes: item.notes,
    unique: item.is_unique,
    sources: extractSpecialProp(item.rulebooks),
  };
};

export const getItemsAndRarity = async (
  db: SQLite.SQLiteDatabase,
  itemType: ItemType,
  constraints: string,
) => {
  const items: any[] = [];
  try {
    const query = `SELECT *
        FROM ${itemType.tableName} x
        JOIN Item_View i ON i.id = x.id
        ${constraints !== '' ? ` WHERE ${constraints}` : ''}`;
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          id: item.id,
          name: item.name,
          rarity: item.rarity,
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

export const getAllPossibleItems = async (
  db: SQLite.SQLiteDatabase,
  constraints: Array<string>,
) => {
  const itemLists: any = [];
  for (let i = 0; i < ITEM_TYPE.length; i++) {
    itemLists.push!(await getItemsAndRarity(db, ITEM_TYPE[i], constraints[i]));
  }
  return itemLists;
};

export const getCategoryList = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
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
          name: item.name,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get' + tableName + ' items !!!');
  }
};

const getAdditionalRules = async (
  db: SQLiteDatabase,
): Promise<AdditionalRule[]> => {
  try {
    const list: AdditionalRule[] = [];
    var results = await db.executeSql(
      `SELECT *
      FROM Additional_Rules
       ORDER BY name`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          name: item.name,
          desc: item.desc,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get additional rules !!!');
  }
};

const getRulebooks = async (db: SQLiteDatabase): Promise<Rulebook[]> => {
  try {
    const list: Rulebook[] = [];
    var results = await db.executeSql(
      `SELECT *
      FROM Rulebooks
       ORDER BY name`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          name: item.name,
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

const getLocations = async (db: SQLiteDatabase): Promise<Location[]> => {
  try {
    const list: Location[] = [];
    var results = await db.executeSql(
      `SELECT *
      FROM Locations
       ORDER BY id`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          name: item.name,
          price_modifier: item.price_modifier,
          rarity_modifier: item.rarity_modifier,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Locations !!!');
  }
};

export const getDBState = async (db: SQLiteDatabase): Promise<DBState> => {
  try {
    const additionalRules = await getAdditionalRules(db);
    const attachments = await getDBAttachmentsState(db);
    const gear = await getDBGearState(db);
    const locations = await getLocations(db);
    const rulebooks = await getRulebooks(db);
    const vehicles = await getDBVehiclesState(db);
    const starships = {
      navicomputer: await getCategoryList(db, 'Navicomputer', undefined),
    };
    const weapons = await getDBWeaponsState(db);
    return {
      additionalRules: additionalRules,
      attachments: attachments,
      locations: locations,
      gear: gear,
      rulebooks: rulebooks,
      starships: starships,
      vehicles: vehicles,
      weapons: weapons,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
