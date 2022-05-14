import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  Special,
  CategoryLike,
  DBState,
  WeaponEffect,
} from '../models/ItemIndex';
import {extractSpecialProp, getCategoryList} from './db-service';

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
          id: item.id,
          name: item.name,
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

export const extractWeaponEffects = (item: any): Special[] => {
  return item.effects ? extractSpecialProp(item.effects) : [];
};
