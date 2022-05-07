import {SQLiteDatabase} from 'react-native-sqlite-storage';
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
    throw Error('Failed to get initial database state !!!');
  }
};
