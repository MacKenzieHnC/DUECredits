import {
  DBState,
  CategoryLike,
  AdditionalRule,
  Location,
  Rulebook,
  ItemType,
  ITEM_TYPE,
  WeaponEffect,
} from '../models/ItemIndex';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBWeaponsState, getWeaponEffects} from './db-service-weapons';
import {getDBAttachmentsState} from './db-service-attachments';
import {getDBGearState} from './db-service-gear';
import {getDBVehiclesState} from './db-service-vehicles';

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
    const locations = await getLocations(db);
    const rulebooks = await getRulebooks(db);
    const additional_rules = await getAdditionalRules(db);
    const weapon_effects: WeaponEffect[] = await getWeaponEffects(db);
    const attachments = await getDBAttachmentsState(db);
    const gear = await getDBGearState(db);
    const vehicles = await getDBVehiclesState(db);
    const starships = {
      navicomputer: await getCategoryList(db, 'Navicomputer', undefined),
    };
    const weapons = await getDBWeaponsState(db);
    return {
      location: locations,
      rulebook: rulebooks,
      additional_rule: additional_rules,
      weapon_effect: weapon_effects,
      attachments: attachments,
      gear: gear,
      starships: starships,
      vehicles: vehicles,
      weapons: weapons,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
