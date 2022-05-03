import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {
  CategoryLike,
  DBState,
  WeaponEffect,
  WeaponItem,
} from '../models/ItemIndex';
import {getItems} from './db-service';
export const getWeaponItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: String,
): Promise<WeaponItem[]> => {
  try {
    // GET WEAPONS
    const itemProps = await getItems(db, ITEM_TYPE.Weapons, tableName);
    const weaponsList: WeaponItem[] = [];
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
        weaponsList.push!({
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

    return weaponsList;
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
    const list: CategoryLike[] = [];
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
          effect: {id: item.id, item: item.name},
          active: item.active,
          ranked: item.ranked,
          desc: item.description,
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
): Promise<DBState['weapons']> => {
  try {
    const categories: CategoryLike[] = await getCategoryList(
      db,
      'Weapon_Categories',
      'item',
    );
    const skills: CategoryLike[] = await getCategoryList(
      db,
      'Weapon_Skills',
      'item',
    );
    const ranges: CategoryLike[] = await getCategoryList(
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
