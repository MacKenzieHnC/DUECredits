export type DBState = {
  weapons: {
    categories: CategoryLike[];
    skills: CategoryLike[];
    ranges: CategoryLike[];
    effects: WeaponEffect[];
  };
};

export type Item = {
  restricted: boolean;
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
};
export type CategoryLike = {
  id: number;
  item: string;
};

export type ArmorItem = {
  itemProps: Item;
  id: number;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
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
export type WeaponEffect = {
  effect: CategoryLike;
  active: boolean;
  ranked: boolean;
  desc: string | undefined;
};
export type AppliedWeaponEffect = {
  effect: number;
  rank: string | undefined;
};
