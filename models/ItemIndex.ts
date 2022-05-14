export type ItemType = {
  key: string;
  name: string;
  tableName: string;
};

export const ITEM_TYPE: ItemType[] = [
  {key: 'armor', name: 'Armor', tableName: 'Armor'},
  {key: 'attachments', name: 'Attachments', tableName: 'Attachments'},
  {key: 'gear', name: 'Gear', tableName: 'Gear'},
  {
    key: 'planetaryVehicles',
    name: 'Planetary Vehicles',
    tableName: 'Planetary_Vehicles_View',
  },
  {
    key: 'starships',
    name: 'Starships',
    tableName: 'Starships_View',
  },
  {
    key: 'vehicleAttachments',
    name: 'Vehicle Attachments',
    tableName: 'Vehicle_Attachments',
  },
  {
    key: 'vehicleWeapons',
    name: 'Vehicle Weapons',
    tableName: 'Vehicle_Weapons',
  },
  {key: 'weapons', name: 'Weapons', tableName: 'Weapons'},
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
