import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {CategoryLike, DBState} from '../models/ItemIndex';
import {getCategoryList} from './db-service';

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
