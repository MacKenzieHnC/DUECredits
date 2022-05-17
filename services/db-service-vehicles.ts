import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {CategoryLike, DBState} from '../models/ItemIndex';
import {getCategoryList} from './db-service';

export const getDBVehiclesState = async (
  db: SQLiteDatabase,
): Promise<DBState['vehicles']> => {
  try {
    const categories: CategoryLike[] = await getCategoryList(
      db,
      'Vehicle_Categories',
      'name',
    );
    const manufacturers: CategoryLike[] = await getCategoryList(
      db,
      'Manufacturers',
      'name',
    );
    const ranges: CategoryLike[] = await getCategoryList(
      db,
      'Ranges_Planetary_Scale',
      'name',
    );

    return {
      category: categories,
      manufacturer: manufacturers,
      sensor: ranges,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial vehicles state !!!');
  }
};
