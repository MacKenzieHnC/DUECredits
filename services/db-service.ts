import {
  Item,
  ArmorList,
  ArmorItem,
  WeaponsList,
  WeaponCategory,
  WeaponSkill,
  WeaponRange,
  WeaponEffect,
  WeaponCategoryList,
} from '../models';
import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: 'SWRPG.db',
    location: 'default',
    createFromLocation: 1,
  });
};

SQLite.enablePromise(true);

const getItems = async (
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
            : `FROM ${parentTable} AS pt JOIN ITEMS i ON pt.Key = i.Key `
        } 
          JOIN Item_Type AS it on i.Item_type = it.key
          WHERE i.Item_Type = ${itemType}`,
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

export const getArmorItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: String,
): Promise<ArmorList> => {
  try {
    const itemProps = await getItems(db, ITEM_TYPE.Armor, tableName);
    const items: ArmorItem[] = [];
    const results = await db.executeSql(
      `SELECT item as key,
          defense as defense, 
          soak as soak,
          encumbrance as encumbrance,
          hardpoints as hardpoints
      FROM Armor`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: itemProps[index],
          key: item.key,
          defense: item.defense,
          soak: item.soak,
          encumbrance: item.encumbrance,
          hardpoints: item.hardpoints,
        });
      }
    });
    return {
      itemType: ITEM_TYPE.Armor,
      items: items,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

export const getWeaponItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: String,
): Promise<WeaponsList> => {
  try {
    // GET CATEGORIES
    const categories: WeaponCategory[] = [];
    var results = await db.executeSql(
      `SELECT key as key,
        category as category
      FROM Weapon_Category`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        categories.push!({
          key: item.key,
          category: item.category,
        });
      }
    });

    // GET SKILLS
    const skills: WeaponSkill[] = [];
    results = await db.executeSql(
      `SELECT key as key,
        skill as skill
      FROM Weapon_Skills`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        skills.push!({
          key: item.key,
          skill: item.skill,
        });
      }
    });

    // GET RANGES
    const ranges: WeaponRange[] = [];
    results = await db.executeSql(
      `SELECT key as key,
        range as range
      FROM Weapon_Range`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        ranges.push!({
          key: item.key,
          range: item.range,
        });
      }
    });

    // GET EFFECTS
    const effects: WeaponEffect[] = [];
    results = await db.executeSql(
      `SELECT key as key,
        effect as effect
      FROM Weapon_Effects`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        effects.push!({
          key: item.key,
          effect: item.effect,
        });
      }
    });

    // GET WEAPONS
    const itemProps = await getItems(db, ITEM_TYPE.Weapons, tableName);
    const weaponsLists: WeaponCategoryList[] = Array(categories.length);
    for (let i = 0; i < weaponsLists.length; i++) {
      weaponsLists[i] = {
        category: i,
        items: [],
      };
    }
    results = await db.executeSql(
      `SELECT item as key,
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
          key: item.key,
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
      categories: categories,
      skills: skills,
      ranges: ranges,
      effects: effects,
      items: weaponsLists,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};
