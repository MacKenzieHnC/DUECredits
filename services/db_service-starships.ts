import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {StarshipItem} from '../models/ItemIndex';
import {extractItemProps} from './db-service';
import {extractVehicleProps} from './db-service-vehicles';

export const getStarshipItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<StarshipItem[]> => {
  try {
    const items: StarshipItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.Starships.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          vehicle: extractVehicleProps(item),
          hyperdrive: item.hyperdrive,
          navicomputer: item.navicomputer,
          additionalRules: item.additionalRules
            ? item.additionalRules.split(',').map((source: string) => {
                const final = source.split(':');
                return {id: final[0], rank: final[1]};
              })
            : [],
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};
