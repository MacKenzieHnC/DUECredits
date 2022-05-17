export type ItemType = {
  key: string;
  name: string;
  tableName: string;
  categories: CategoryColumn[];
  specials: SpecialColumn[]; // Column will contain a list of numbers with or without modifiers
};

export type CategoryColumn = {
  keyLocation: string;
  key: string;
};

type SpecialColumn = {
  key: string | string[];
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
    categories: [{keyLocation: 'attachments', key: 'category'}],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'gear',
    name: 'Gear',
    tableName: 'Gear',
    categories: [{keyLocation: 'gear', key: 'category'}],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'planetaryVehicles',
    name: 'Planetary Vehicles',
    tableName: 'Planetary_Vehicles_View',
    categories: [
      {keyLocation: 'vehicles', key: 'category'},
      {keyLocation: 'vehicles', key: 'manufacturer'},
      {keyLocation: 'vehicles', key: 'sensors'},
    ],
    specials: [{key: 'rulebooks'}],
  },
  {
    key: 'starships',
    name: 'Starships',
    tableName: 'Starships_View',
    categories: [
      {keyLocation: 'vehicles', key: 'category'},
      {keyLocation: 'vehicles', key: 'manufacturer'},
      {keyLocation: 'vehicles', key: 'sensors'},
      {keyLocation: 'starships', key: 'navicomputer'},
    ],
    specials: [{key: 'rulebooks'}, {key: 'additional_rules'}],
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
    categories: [
      {keyLocation: 'weapons', key: 'category'},
      {keyLocation: 'weapons', key: 'range'},
    ],
    specials: [{key: 'rulebooks'}, {key: 'weapon_effects'}],
  },
  {
    key: 'weapons',
    name: 'Weapons',
    tableName: 'Weapons_View',
    categories: [
      {keyLocation: 'weapons', key: 'category'},
      {keyLocation: 'weapons', key: 'skill'},
      {keyLocation: 'weapons', key: 'range'},
    ],
    specials: [{key: 'rulebooks'}, {key: 'weapon_effects'}],
  },
];

export type DBState = {
  location: Location[];
  rulebook: Rulebook[];

  additional_rule: AdditionalRule[];
  weapon_effect: WeaponEffect[];

  attachments: {
    category: CategoryLike[];
  };

  gear: {
    category: CategoryLike[];
  };

  starships: {
    navicomputer: CategoryLike[];
  };

  vehicles: {
    category: CategoryLike[];
    manufacturer: CategoryLike[];
    sensor: CategoryLike[];
  };

  weapons: {
    category: CategoryLike[];
    skill: CategoryLike[];
    range: CategoryLike[];
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
