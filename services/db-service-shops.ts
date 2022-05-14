import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {Shop, ShopOptions} from '../models/InventoryOptionsIndex';
import {JSONToString, StringToJSON} from './db-service';

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
      VALUES( '${shopName}', (SELECT rules FROM Shops WHERE id = 0));`,
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
  items: any[],
): Promise<void> => {
  console.log('Length according to setInventory: ', items.length);
  const values = items
    .map(
      item =>
        '(' + shop.id + ',' + item.id + ',"' + JSONToString(item.roll) + '")',
    )
    .join(',');
  try {
    await db.executeSql(
      `DELETE FROM Shop_Inventory
        WHERE shop = ${shop.id}`,
    );
    await db.executeSql(
      `INSERT INTO Shop_Inventory (shop, item, roll)
        VALUES ${values}`,
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to set inventory !!!');
  }
};

export const getShopInventory = async (
  db: SQLiteDatabase,
  shop: Shop,
): Promise<any> => {
  const itemLists: any = [];
  try {
    for (let i = 0; i < ITEM_TYPE.length; i++) {
      const query = `SELECT *
        FROM ${ITEM_TYPE[i].tableName} x
        JOIN Items i ON i.id = x.id
        JOIN Shop_Inventory s ON s.item = x.id
        WHERE s.shop = ${shop.id}`;
      console.log(query);
      const results = await db.executeSql(query);
      const items: any[] = [];
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          items.push!(result.rows.item(index));
        }
      });
      console.log('Length according to sql: ', items.length);
      itemLists.push!(items);
    }
    console.log('List length according to SQL: ', itemLists.length);
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
