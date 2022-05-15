import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Shop, ShopOptions} from '../models/InventoryOptionsIndex';
import {ItemType, ITEM_TYPE} from '../models/ItemIndex';
import {extractSpecialProp, JSONToString, StringToJSON} from './db-service';

export const updateRules = async (
  db: SQLiteDatabase,
  shopID: number,
  rules: ShopOptions,
) => {
  try {
    var json = JSONToString(rules);
    await db.executeSql(
      `UPDATE Shops SET rules = "${json}" WHERE id = ${shopID}`,
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};

export const getShop = async (
  db: SQLiteDatabase,
  id: number,
): Promise<Shop> => {
  try {
    const results = await db.executeSql(
      `SELECT *
      FROM Shops
      WHERE id = ${id}`,
    );
    const item = results[0].rows.item(0);
    return {
      id: item.id,
      name: item.name,
      options: StringToJSON(item.rules),
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get shop !!!');
  }
};

export const getAllShops = async (db: SQLiteDatabase): Promise<Shop[]> => {
  try {
    const results = await db.executeSql(
      `SELECT *
      FROM Shops`,
    );
    const list: Shop[] = [];
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        list.push!({
          id: item.id,
          name: item.name,
          options: StringToJSON(item.rules),
        });
      }
    });
    return list;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get shops !!!');
  }
};

export const resetRules = async (db: SQLiteDatabase, shopID: number) => {
  try {
    var json = JSONToString(hardcodedShopRules);
    await db.executeSql(
      `UPDATE Shops SET rules = "${json}" WHERE id = ${shopID}`,
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};

export const newShop = async (
  db: SQLiteDatabase,
  shopName: string,
): Promise<number> => {
  try {
    await db.executeSql(
      `INSERT INTO Shops (name, rules) 
      VALUES( "${shopName}", (SELECT rules FROM Shops WHERE id = 0));`,
    );
    const results = await db.executeSql(`SELECT last_insert_rowid() AS id;`);
    return results[0].rows.item(0).id;
  } catch (error) {
    console.error(error);
    throw Error('Failed to add shop !!!');
  }
};

export const setShopInventory = async (
  db: SQLiteDatabase,
  shop: Shop,
  items: any[][],
): Promise<void> => {
  const values: string[] = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      values.push!(
        '(' +
          shop.id +
          ',' +
          items[i][j].id +
          ',"' +
          JSONToString(items[i][j].roll) +
          '")',
      );
    }
  }
  try {
    await db.executeSql(
      `DELETE FROM Shop_Inventory
        WHERE shop = ${shop.id}`,
    );
    if (values.length > 0) {
      await db.executeSql(
        `INSERT INTO Shop_Inventory (shop, item, roll)
        VALUES ${values.join(',')}`,
      );
    }
  } catch (error) {
    console.error(error);
    throw Error('Failed to set inventory !!!');
  }
};

const isSpecial = (itemType: ItemType, prop: string) => {
  for (let i = 0; i < itemType.specials.length; i++) {
    if (itemType.specials[i].key === prop) {
      return true;
    }
  }
  return false;
};

export const getShopInventory = async (
  db: SQLiteDatabase,
  shop: Shop,
): Promise<any[][]> => {
  const itemLists: any = [];
  try {
    for (let i = 0; i < ITEM_TYPE.length; i++) {
      const query = `SELECT *
        FROM ${ITEM_TYPE[i].tableName} x
        JOIN Item_View i ON i.id = x.id
        JOIN Shop_Inventory s ON s.item = x.id
        WHERE s.shop = ${shop.id}`;
      const results = await db.executeSql(query);
      const items: any[] = [];
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          const item = {};
          const props = Object.keys(result.rows.item(index));
          props.forEach(prop => {
            if (
              isSpecial(ITEM_TYPE[i], prop) &&
              result.rows.item(index)[prop]
            ) {
              item[prop] = extractSpecialProp(result.rows.item(index)[prop]);
            } else {
              item[prop] = result.rows.item(index)[prop];
            }
            console.log(prop);
          });
          items.push!(item);
        }
      });
      itemLists.push!(items);
    }
    return itemLists;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get inventory !!!');
  }
};

// TODO: Hardcoded shop
const hardcodedShopRules = {
  location: 4,
  inventoryOptions: {
    general: {
      limit: 'any',
      restricted: 'any',
      price: 'any',
      rarity: 'any',
      is_unique: 'any',
    },
    armor: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      defense: 'any',
      soak: 'any',
      encumbrance: 'any',
      hardpoints: 'any',
    },
    attachments: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      categories: 'any',
      encumbrance: 'any',
      hardpoints: 'any',
    },
    gear: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      categories: 'any',
      encumbrance: 'any',
    },
    planetaryVehicles: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      type: 'any',
      categories: 'any',
      manufacturer: 'any',
      model: 'any',
      silhouette: 'any',
      speed: 'any',
      handling: 'any',
      armor: 'any',
      htt: 'any',
      sst: 'any',
      defense: 'any',
      sensors: 'any',
      crew: 'any',
      encumbrance: 'any',
      passengers: 'any',
      hardpoints: 'any',
      weapons: 'any',
    },
    starships: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      type: 'any',
      categories: 'any',
      manufacturer: 'any',
      model: 'any',
      silhouette: 'any',
      speed: 'any',
      handling: 'any',
      armor: 'any',
      htt: 'any',
      sst: 'any',
      defense: 'any',
      sensors: 'any',
      crew: 'any',
      encumbrance: 'any',
      passengers: 'any',
      hardpoints: 'any',
      weapons: 'any',
      navicomputer: 'any',
      additionalRules: 'any',
    },
    vehicleAttachments: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      hardpoints: 'any',
    },
    vehicleWeapons: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      categories: 'any',
      ranges: 'any',
      damage: 'any',
      crit: 'any',
      compatibleSilhouette: 'any',
      effects: 'any',
    },
    weapons: {
      limit: 'any',
      general: {
        limit: 'any',
        restricted: 'any',
        price: 'any',
        rarity: 'any',
        is_unique: 'any',
      },
      categories: 'any',
      skills: 'any',
      damage: 'any',
      crit: 'any',
      ranges: 'any',
      effects: 'any',
      encumbrance: 'any',
      hardpoints: 'any',
    },
  },
};
