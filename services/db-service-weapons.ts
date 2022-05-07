import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {
  AppliedEffect,
  CategoryLike,
  DBState,
  WeaponEffect,
  WeaponItem,
} from '../models/ItemIndex';
import {extractItemProps, getCategoryList} from './db-service';
export const getWeaponItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<WeaponItem[]> => {
  try {
    // GET WEAPONS
    const items: WeaponItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.Weapons.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          category: item.category,
          skill: item.skill,
          damage: item.damage,
          crit: item.crit,
          range: item.range,
          encumbrance: item.encumbrance,
          hardpoints: item.hardpoints,
          effects: extractWeaponEffects(item),
        });
      }
    });

    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

const getWeaponEffects = async (db: SQLite.SQLiteDatabase) => {
  try {
    const list: WeaponEffect[] = [];
    var results = await db.executeSql(
      `SELECT *
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
      'name',
    );
    const skills: CategoryLike[] = await getCategoryList(
      db,
      'Weapon_Skills',
      'name',
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

export const extractWeaponEffects = (item: any): AppliedEffect[] => {
  return item.effects
    ? item.effects.split(',').map((effect: string) => {
        const final = effect.split(':');
        return {id: final[0], rank: final[1]};
      })
    : [];
};
