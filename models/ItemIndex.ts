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

export type Item = {
  id: number;
  restricted: boolean;
  item_type: number;
  name: string;
  price: number;
  rarity: number;
  notes: string;
  unique: boolean;
  sources: Special[];
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

export type ArmorItem = {
  itemProps: Item;
  defense: number;
  soak: number;
  encumbrance: number;
  hardpoints: number;
};

export type AttachmentItem = {
  itemProps: Item;
  category: number;
  encumbrance: number;
  hardpoints: number;
};

export type GearItem = {
  itemProps: Item;
  category: number;
  encumbrance: number;
};
export type PlanetaryVehicleItem = {
  itemProps: Item;
  vehicle: Vehicle;
};

export type Rulebook = {
  id: number;
  name: string;
  abbrev: string;
};

export type StarshipItem = {
  itemProps: Item;
  vehicle: Vehicle;
  hyperdrive: string;
  navicomputer: number;
  additionalRules: Special[];
};

export type Vehicle = {
  type: number;
  category: number;
  manufacturer: number;
  model: string;
  silhouette: number;
  speed: number;
  handling: number;
  armor: number;
  htt: number;
  sst: number;
  defense: string;
  sensors: number;
  crew: number;
  encumbrance: number;
  passengers: number;
  hardpoints: number;
  weapons: number;
};

export type VehicleAttachmentItem = {
  itemProps: Item;
  hardpoints: number;
};

export type VehicleWeaponItem = {
  itemProps: Item;
  category: number;
  range: number;
  damage: number;
  crit: number;
  compatibleSilhouette: number;
  effects: Special[];
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
  effects: Special[];
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
