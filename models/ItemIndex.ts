export type Item = {
  restricted: 'TRUE' | 'FALSE';
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
};
export type ListItem = {
  id: number;
  item: string;
};
export type ArmorList = {
  itemType: number;
  items: ArmorItem[];
};
export type ArmorItem = {
  itemProps: Item;
  id: number;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
};

export type WeaponsList = {
  itemType: number;
  items: WeaponCategoryList[];
};
export type WeaponCategoryList = {
  category: number;
  items: WeaponItem[];
};
export type WeaponItem = {
  itemProps: Item;
  id: number;
  category: number;
  skill: number;
  damage: number;
  crit: string;
  range: number;
  encumbrance: number;
  hardpoints: number;
};
export type AppliedWeaponEffect = {
  effect: number;
  modifier: string;
};

export type DBWeaponsState = {
  categories: ListItem[];
  skills: ListItem[];
  ranges: ListItem[];
  effects: ListItem[];
};

export type DBState = {
  weapons: DBWeaponsState;
};
