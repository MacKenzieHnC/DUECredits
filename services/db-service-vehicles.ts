import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {
  CategoryLike,
  DBState,
  PlanetaryVehicleItem,
  Vehicle,
} from '../models/ItemIndex';
import {extractItemProps, getCategoryList} from './db-service';

export const getPlanetaryVehicleItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<PlanetaryVehicleItem[]> => {
  try {
    const items: PlanetaryVehicleItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.Vehicles.tableName} x
        JOIN Item_View i ON i.id = x.item
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          vehicle: extractVehicleProps(item),
        });
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};

export const getDBVehiclesState = async (
  db: SQLiteDatabase,
): Promise<DBState['vehicles']> => {
  try {
    const categories: CategoryLike[] = await getCategoryList(
      db,
      'Vehicle_Categories',
      'item',
    );
    const manufacturers: CategoryLike[] = await getCategoryList(
      db,
      'Manufacturers',
      'item',
    );
    const ranges: CategoryLike[] = await getCategoryList(
      db,
      'Ranges_Planetary_Scale',
      'item',
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
