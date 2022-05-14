import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {CategoryLike, DBState, Vehicle} from '../models/ItemIndex';
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
      categories: categories,
      manufacturers: manufacturers,
      ranges: ranges,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial vehicles state !!!');
  }
};

export const extractVehicleProps = (item: any): Vehicle => {
  return {
    type: item.type,
    category: item.category,
    manufacturer: item.manufacturer,
    model: item.model,
    silhouette: item.silhouette,
    speed: item.speed,
    handling: item.handling,
    armor: item.armor,
    htt: item.htt,
    sst: item.sst,
    defense: item.defense,
    sensors: item.sensors,
    crew: item.crew,
    encumbrance: item.encumbrance,
    passengers: item.passengers,
    hardpoints: item.hardpoints,
    weapons: item.weapons,
  };
};
