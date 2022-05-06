import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  GeneralOptions,
  InventoryOptions,
  Shop,
  ShopOptions,
} from '../models/InventoryOptionsIndex';

export const getShop = async (
  db: SQLiteDatabase,
  shopID: number,
): Promise<Shop> => {
  try {
    // TODO: Hardcoded shop
    const defaultGeneralOptions: GeneralOptions = {
      restricted: 'any',
      price: 'any',
      rarity: 'any',
      is_unique: 'any',
    };
    const defaultInventoryOptions: InventoryOptions = {
      general: defaultGeneralOptions,
      armor: {
        general: defaultGeneralOptions,
        limit: 'any',
        defense: 'any',
        soak: 'any',
        encumbrance: 'any',
        hardpoints: 'any',
      },
      weapons: {
        general: defaultGeneralOptions,
        limit: 'any',
        categories: 'any',
        skills: 'any',
        damage: 'any',
        crit: 'any',
        ranges: 'any',
        effects: 'any',
        encumbrance: 'any',
        hardpoints: 'any',
      },
    };

    const defaultShopOptions: ShopOptions = {
      location: 0,
      inventoryOptions: defaultInventoryOptions,
    };

    return {
      id: shopID,
      name: 'default',
      options: defaultShopOptions,
    };
  } catch (error) {
    console.error(error);
    throw Error('Failed to get initial database state !!!');
  }
};
