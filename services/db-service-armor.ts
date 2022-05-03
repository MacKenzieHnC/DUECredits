import SQLite from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {ArmorList, ArmorItem} from '../models/ItemIndex';
import {getItems} from './db-service';

export const getArmorItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: String,
): Promise<ArmorList> => {
  try {
    const itemProps = await getItems(db, ITEM_TYPE.Armor, tableName);
    const items: ArmorItem[] = [];
    const results = await db.executeSql(
      `SELECT item as id,
          defense as defense, 
          soak as soak,
          encumbrance as encumbrance,
          hardpoints as hardpoints
      FROM Armor`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: itemProps[index],
          id: item.id,
          defense: item.defense,
          soak: item.soak,
          encumbrance: item.encumbrance,
          hardpoints: item.hardpoints,
        });
      }
    });
    return {
      itemType: ITEM_TYPE.Armor,
      items: items,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items !!!');
  }
};
