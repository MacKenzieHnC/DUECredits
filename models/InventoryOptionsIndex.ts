export type generalOptions = {
  restricted: boolean | 'any';
  price: number[] | 'any';
  rarity: number[] | 'any';
  is_unique: boolean | 'any';
};

export type inventoryOptions = {
  general: generalOptions;
  armor: {
    general: generalOptions;
    limit: 'limit' | 'any' | 'none';
    defense: number[] | 'any';
    soak: number[] | 'any';
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  weapons: {
    general: generalOptions;
    limit: 'limit' | 'any' | 'none';
    category: number[] | 'any'; // Key from db
    skill: number[] | 'any'; // Key from db
    damage: number[] | 'any';
    crit: number[] | 'any';
    range: number[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
};

export type shopOptions = {
  inventoryOptions: inventoryOptions;
  location: number;
};
