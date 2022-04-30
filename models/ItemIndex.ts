export type Item = {
  restricted: 'TRUE' | 'FALSE';
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
};
export type ArmorList = {
  itemType: number;
  items: ArmorItem[];
};
export type ArmorItem = {
  itemProps: Item;
  key: number;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
};

export type WeaponsList = {
  itemType: number;
  categories: WeaponCategory[];
  skills: WeaponSkill[];
  ranges: WeaponRange[];
  effects: WeaponEffect[];
  items: WeaponCategoryList[];
};
export type WeaponCategory = {
  key: number;
  category: string;
};
export type WeaponCategoryList = {
  category: number;
  items: WeaponItem[];
};
export type WeaponSkill = {
  key: number;
  skill: string;
};
export type WeaponRange = {
  key: number;
  range: string;
};
export type WeaponItem = {
  itemProps: Item;
  key: number;
  category: number;
  skill: number;
  damage: number;
  crit: string;
  range: number;
  encumbrance: number;
  hardpoints: number;
};
export type WeaponEffect = {
  key: number;
  effect: string;
};
export type AppliedWeaponEffect = {
  effect: number;
  modifier: string;
};
