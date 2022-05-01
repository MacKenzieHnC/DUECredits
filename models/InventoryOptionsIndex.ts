import {ListItem} from './ItemIndex';

export type generalOptions = {
  restricted: boolean | 'any';
  price: number[] | 'any';
  rarity: number[] | 'any';
  is_unique: boolean | 'any';
};

export type inventoryOptions = {
  general: generalOptions;
  armor: {
    general: generalOptions;
    limit: 'limit' | 'any' | 'none';
    defense: number[] | 'any';
    soak: number[] | 'any';
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  weapons: {
    general: generalOptions;
    limit: 'limit' | 'any' | 'none';
    categories: ListItem[] | 'any'; // Key from db
    skills: ListItem[] | 'any'; // Key from db
    damage: number[] | 'any';
    crit: number[] | 'any';
    ranges: ListItem[] | 'any'; // Key from db
    effects: ListItem[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
};

export type shopOptions = {
  inventoryOptions: inventoryOptions;
  location: number;
};
