import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {GearItem, CategoryLike, DBState} from '../models/ItemIndex';
import {extractItemProps, getCategoryList} from './db-service';

export const getGearItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<GearItem[]> => {
  try {
    const items: GearItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.Gear.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          category: item.category,
          encumbrance: item.encumbrance,
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

export const getDBGearState = async (
  db: SQLiteDatabase,
): Promise<DBState['gear']> => {
  try {
    const categories: CategoryLike[] = await getCategoryList(
      db,
      'Gear_Categories',
      'name',
    );

    return {
      categories: categories,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial gear state !!!');
  }
};
