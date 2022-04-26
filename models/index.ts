export type Item = {
  restricted: boolean;
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
};
export type ArmorList = {
  itemType: 1;
  items: ArmorItem[];
}
export type ArmorItem = {
  itemProps: Item;
  key: number;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
};

export type WeaponsList = {
  itemType: 7;
  categories: WeaponCategory[];
  skills: WeaponSkill[];
  ranges: WeaponRange[];
  effects: WeaponEffect[];
  items: WeaponCategoryList[];
};
export type WeaponCategory = {
  key: number;
  category: String;
};
export type WeaponCategoryList = {
  category: number;
  items: WeaponItem[];
}
export type WeaponSkill = {
  key: number;
  skill: String;
};
export type WeaponRange = {
  key: number;
  range: String;
};
export type WeaponItem = {
  itemProps: Item;
  key: number;
  category: number;
  skill: number;
  damage: number;
  crit: String;
  range: number;
  encumbrance: number;
  hardpoints: number;
};
export type WeaponEffect = {
  key: number;
  effect: String;
};
export type AppliedWeaponEffect = {
  effect: number;
  modifier: String;
};
