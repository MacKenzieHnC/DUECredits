import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ITEM_TYPE} from '../constants/enum';
import {AttachmentItem, CategoryLike, DBState} from '../models/ItemIndex';
import {extractItemProps, getCategoryList} from './db-service';

export const getAttachmentItems = async (
  db: SQLite.SQLiteDatabase,
  tableName: string | undefined,
): Promise<AttachmentItem[]> => {
  try {
    const items: AttachmentItem[] = [];
    const results = await db.executeSql(
      `SELECT *
        FROM ${ITEM_TYPE.Attachments.tableName} x
        JOIN Item_View i ON i.id = x.id
        ${tableName ? ` JOIN ${tableName} limiter ON i.id = limiter.id` : ''}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const item = result.rows.item(index);
        items.push!({
          itemProps: extractItemProps(item),
          category: item.category,
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

export const getDBAttachmentsState = async (
  db: SQLiteDatabase,
): Promise<DBState['attachments']> => {
  try {
    const categories: CategoryLike[] = await getCategoryList(
      db,
      'Attachment_Categories',
      'name',
    );

    return {
      categories: categories,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial attachments state !!!');
  }
};
