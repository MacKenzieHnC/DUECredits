import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {VehicleWeaponItem} from '../models/ItemIndex';
import {extractItemProps} from './db-service';
import {extractWeaponEffects} from './db-service-weapons';

export const getVehicleWeaponItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<VehicleWeaponItem[]> => {
  try {
    const items: VehicleWeaponItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.VehicleWeapons.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          category: item.category,
          range: item.range,
          damage: item.damage,
          crit: item.crit,
          compatibleSilhouette: item.compatibleSilhouette,
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
