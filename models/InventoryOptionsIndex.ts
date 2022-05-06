import {CategoryLike, WeaponEffect} from './ItemIndex';

export type GeneralOptions = {
  restricted: boolean | 'any';
  price: number[] | 'any';
  rarity: number[] | 'any';
  is_unique: boolean | 'any';
};

export type InventoryOptions = {
  general: GeneralOptions;
  armor: {
    general: GeneralOptions;
    limit: 'limit' | 'any' | 'none';
    defense: number[] | 'any';
    soak: number[] | 'any';
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  weapons: {
    general: GeneralOptions;
    limit: 'limit' | 'any' | 'none';
    categories: CategoryLike[] | 'any'; // Key from db
    skills: CategoryLike[] | 'any'; // Key from db
    damage: number[] | 'any';
    crit: number[] | 'any';
    ranges: CategoryLike[] | 'any'; // Key from db
    effects: WeaponEffect[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
};

export type ShopOptions = {
  inventoryOptions: InventoryOptions;
  location: number;
};

export type Shop = {
  id: number;
  name: string;
  options: ShopOptions;
};
