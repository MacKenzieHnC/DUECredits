export type DBState = {
  rulebooks: Rulebook[];

  weapons: {
    categories: CategoryLike[];
    skills: CategoryLike[];
    ranges: CategoryLike[];
    effects: WeaponEffect[];
  };
};

export type Item = {
  id: number;
  restricted: boolean;
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
  sources: Source[];
};

export type CategoryLike = {
  id: number;
  item: string;
};

export type AppliedEffect = {
  id: number;
  rank: string | undefined;
};

export type ArmorItem = {
  itemProps: Item;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
};

export type Rulebook = {
  id: number;
  item: string;
  abbrev: string;
};

export type Source = {
  rulebook: number;
  page: number;
};

export type WeaponItem = {
  itemProps: Item;
  category: number;
  skill: number;
  damage: number;
  crit: string;
  range: number;
  encumbrance: number;
  hardpoints: number;
  effects: AppliedEffect[];
};

export type WeaponEffect = {
  effect: CategoryLike;
  active: boolean;
  ranked: boolean;
  desc: string | undefined;
};
