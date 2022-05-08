import {AdditionalRule, CategoryLike, WeaponEffect} from './ItemIndex';

export type GeneralOptions = {
  limit: 'limit' | 'any';
  restricted: boolean | 'any';
  price: number[] | 'any';
  rarity: number[] | 'any';
  is_unique: boolean | 'any';
};

export type InventoryOptions = {
  general: GeneralOptions;
  armor: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    defense: number[] | 'any';
    soak: number[] | 'any';
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  attachments: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    categories: CategoryLike[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  gear: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    categories: CategoryLike[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
  };
  planetaryVehicles: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    categories: CategoryLike[] | 'any';
    manufacturer: CategoryLike[] | 'any';
    model: string | 'any';
    silhouette: number[] | 'any';
    speed: number[] | 'any';
    handling: number[] | 'any';
    armor: number[] | 'any';
    htt: number[] | 'any';
    sst: number[] | 'any';
    defense: string | 'any';
    sensors: CategoryLike[] | 'any';
    crew: number[] | 'any';
    encumbrance: number[] | 'any';
    passengers: number[] | 'any';
    hardpoints: number[] | 'any';
    weapons: number[] | 'any';
  };
  starships: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    categories: CategoryLike[] | 'any';
    manufacturer: CategoryLike[] | 'any';
    model: string | 'any';
    silhouette: number[] | 'any';
    speed: number[] | 'any';
    handling: number[] | 'any';
    armor: number[] | 'any';
    htt: number[] | 'any';
    sst: number[] | 'any';
    defense: string | 'any';
    sensors: CategoryLike[] | 'any';
    crew: number[] | 'any';
    encumbrance: number[] | 'any';
    passengers: number[] | 'any';
    hardpoints: number[] | 'any';
    weapons: number[] | 'any';
    navicomputer: CategoryLike[] | 'any';
    additionalRules: AdditionalRule[] | 'any';
  };
  vehicleAttachments: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    hardpoints: number[] | 'any';
  };
  vehicleWeapons: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
    categories: CategoryLike[] | 'any';
    ranges: CategoryLike[] | 'any';
    damage: number[] | 'any';
    crit: number[] | 'any';
    compatibleSilhouette: number[] | 'any';
    effects: WeaponEffect[] | 'any';
  };
  weapons: {
    limit: 'limit' | 'any' | 'none';
    general: GeneralOptions;
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
