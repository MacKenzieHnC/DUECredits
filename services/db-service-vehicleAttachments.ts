import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {VehicleAttachmentItem} from '../models/ItemIndex';
import {extractItemProps} from './db-service';

export const getVehicleAttachmentItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string,
): Promise<VehicleAttachmentItem[]> => {
  try {
    const items: VehicleAttachmentItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.VehicleAttachments.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
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
