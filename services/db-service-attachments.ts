import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {CategoryLike, DBState} from '../models/ItemIndex';
import {getCategoryList} from './db-service';

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
