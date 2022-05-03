import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {
  DBWeaponsState,
  WeaponsList,
  WeaponCategoryList,
  ListItem,
  WeaponEffect,
} from '../models/ItemIndex';
import {getItems} from './db-service';
export const getWeaponItems = async (
  db: SQLite.SQLiteDatabase,
  dbWeaponsState: DBWeaponsState,
  tableName: String,
): Promise<WeaponsList> => {
  try {
    // GET WEAPONS
    const itemProps = await getItems(db, ITEM_TYPE.Weapons, tableName);
    const weaponsLists: WeaponCategoryList[] = Array(
      dbWeaponsState.categories.length,
    );
    for (let i = 0; i < weaponsLists.length; i++) {
      weaponsLists[i] = {
        category: i,
        items: [],
      };
    }
    const results = await db.executeSql(
      `SELECT item as id,
        category as category,
        skill as skill,
        damage as damage,
        crit as crit,
        range as range,
        encumbrance as encumbrance,
        hardpoints as hardpoints
      FROM Weapons`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        weaponsLists[item.category].items.push!({
          id: item.id,
          itemProps: itemProps[index],
          category: item.category,
          skill: item.skill,
          damage: item.damage,
          crit: item.crit,
          range: item.range,
          encumbrance: item.encumbrance,
          hardpoints: item.hardpoints,
        });
      }
    });

    return {
      itemType: ITEM_TYPE.Weapons,
      items: weaponsLists,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

const getCategoryList = async (
  db: SQLite.SQLiteDatabase,
  tableName: string,
  orderBy: string | undefined,
) => {
  try {
    const list: ListItem[] = [];
    var results = await db.executeSql(
      `SELECT id,
        item
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

const getWeaponEffects = async (db: SQLite.SQLiteDatabase) => {
  try {
    const list: WeaponEffect[] = [];
    var results = await db.executeSql(
      `SELECT id,
        name,
        active,
        ranked,
        description
      FROM Weapon_Effects
      ORDER BY name`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          name: item.name,
          active: item.active,
          ranked: item.ranked,
          description: item.description,
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Weapon Effects !!!');
  }
};

export const getDBWeaponsState = async (
  db: SQLiteDatabase,
): Promise<DBWeaponsState> => {
  try {
    const categories: ListItem[] = await getCategoryList(
      db,
      'Weapon_Categories',
      'item',
    );
    const skills: ListItem[] = await getCategoryList(
      db,
      'Weapon_Skills',
      'item',
    );
    const ranges: ListItem[] = await getCategoryList(
      db,
      'Ranges_Local_Scale',
      'id',
    );
    const effects: WeaponEffect[] = await getWeaponEffects(db);

    return {
      categories: categories,
      skills: skills,
      ranges: ranges,
      effects: effects,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial weapons state !!!');
  }
};
