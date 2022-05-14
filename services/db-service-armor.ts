import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {Shop} from '../models/InventoryOptionsIndex';
import {ArmorItem} from '../models/ItemIndex';
import {extractItemProps} from './db-service';

export const getArmorItems = async (
  db: SQLite.SQLiteDatabase,
  shop?: Shop,
): Promise<ArmorItem[]> => {
  try {
    const items: ArmorItem[] = [];
    const query = `SELECT *
        FROM ${ITEM_TYPE.Armor.tableName} x
        JOIN Item_View i ON i.id = x.id
        ${
          shop
            ? ` JOIN Shop_Inventory s ON x.id = s.item WHERE s.shop = ${shop.id}`
            : ''
        }`;
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          defense: item.defense,
          soak: item.soak,
          encumbrance: item.encumbrance,
          hardpoints: item.hardpoints,
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};
