import {
  Item,
  ArmorList,
  ArmorItem,
  WeaponsList,
  WeaponCategoryList,
  ListItem,
  DBWeaponsState,
  DBState,
} from '../models/ItemIndex';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
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
            : `FROM ${parentTable} AS pt JOIN ITEMS i ON pt.id = i.id `
        } 
          JOIN Item_Types AS it on i.Item_Type = it.id
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
      `SELECT item as id,
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
          id: item.id,
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
    const ranges: ListItem[] = await getCategoryList(db, 'Weapon_Ranges', 'id');
    const effects: ListItem[] = await getCategoryList(
      db,
      'Weapon_Effects',
      'item',
    );

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

export const getDBState = async (db: SQLiteDatabase): Promise<DBState> => {
  try {
    const weapons = await getDBWeaponsState(db);
    return {weapons: weapons};
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
