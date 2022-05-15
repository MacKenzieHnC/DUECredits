export type ItemType = {
  key: string;
  name: string;
  tableName: string;
  specials: SpecialColumn[]; // Column will contain a list of numbers with or without modifiers
};

type SpecialColumn = {
  key: string | string[];
};

export const ITEM_TYPE: ItemType[] = [
  {
    key: 'armor',
    name: 'Armor',
    tableName: 'Armor',
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'attachments',
    name: 'Attachments',
    tableName: 'Attachments',
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'gear',
    name: 'Gear',
    tableName: 'Gear',
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'planetaryVehicles',
    name: 'Planetary Vehicles',
    tableName: 'Planetary_Vehicles_View',
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'starships',
    name: 'Starships',
    tableName: 'Starships_View',
    specials: [{key: 'rulebooks'}, {key: 'additional_rules'}],
  },
  {
    key: 'vehicleAttachments',
    name: 'Vehicle Attachments',
    tableName: 'Vehicle_Attachments',
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'vehicleWeapons',
    name: 'Vehicle Weapons',
    tableName: 'Vehicle_Weapons_View',
    specials: [{key: 'rulebooks'}, {key: 'weapon_effects'}],
  },
  {
    key: 'weapons',
    name: 'Weapons',
    tableName: 'Weapons_View',
    specials: [{key: 'rulebooks'}, {key: 'weapon_effects'}],
  },
];

export type DBState = {
  locations: Location[];
  rulebooks: Rulebook[];

  additional_rules: AdditionalRule[];
  weapon_effects: WeaponEffect[];

  attachments: {
    categories: CategoryLike[];
  };

  gear: {
    categories: CategoryLike[];
  };

  starships: {
    navicomputer: CategoryLike[];
  };

  vehicles: {
    categories: CategoryLike[];
    manufacturers: CategoryLike[];
    sensors: CategoryLike[];
  };

  weapons: {
    categories: CategoryLike[];
    skills: CategoryLike[];
    ranges: CategoryLike[];
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
