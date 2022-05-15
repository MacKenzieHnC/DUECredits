export type ItemType = {
  key: string;
  name: string;
  tableName: string;
  categories: SpecialColumn[]; // Column will just contain a number referencing part of the dbState
  specials: SpecialColumn[]; // Column will contain a list of numbers with or without modifiers
};

type SpecialColumn = {
  key: string;
};

export const ITEM_TYPE: ItemType[] = [
  {
    key: 'armor',
    name: 'Armor',
    tableName: 'Armor',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'attachments',
    name: 'Attachments',
    tableName: 'Attachments',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'gear',
    name: 'Gear',
    tableName: 'Gear',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'planetaryVehicles',
    name: 'Planetary Vehicles',
    tableName: 'Planetary_Vehicles_View',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'starships',
    name: 'Starships',
    tableName: 'Starships_View',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'vehicleAttachments',
    name: 'Vehicle Attachments',
    tableName: 'Vehicle_Attachments',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'vehicleWeapons',
    name: 'Vehicle Weapons',
    tableName: 'Vehicle_Weapons_View',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'weapons',
    name: 'Weapons',
    tableName: 'Weapons_View',
    categories: [],
    specials: [{key: 'rulebooks'}],
  },
];

export type DBState = {
  additionalRules: AdditionalRule[];

  attachments: {
    categories: CategoryLike[];
  };

  gear: {
    categories: CategoryLike[];
  };

  locations: Location[];

  rulebooks: Rulebook[];

  starships: {
    navicomputer: CategoryLike[];
  };

  vehicles: {
    categories: CategoryLike[];
    manufacturers: CategoryLike[];
    ranges: CategoryLike[];
  };

  weapons: {
    categories: CategoryLike[];
    skills: CategoryLike[];
    ranges: CategoryLike[];
    effects: WeaponEffect[];
  };
};

export type CategoryLike = {
  id: number;
  name: string;
};

export type AdditionalRule = {
  id: number;
  name: string;
  desc: string;
};

export type Location = {
  id: number;
  name: string;
  price_modifier: number;
  rarity_modifier: number;
};

export type Rulebook = {
  id: number;
  name: string;
  abbrev: string;
};

export type WeaponEffect = {
  id: number;
  name: string;
  active: boolean;
  ranked: boolean;
  desc: string | undefined;
};

export type Special = {
  id: number;
  modifier: string | undefined;
};
