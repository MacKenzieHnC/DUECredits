export type generalRules = {
  general: {
    restricted: true | false | 'any';
    price: number[] | 'any';
    rarity: number[] | 'any';
    is_unique: true | false | 'any';
  };
};
export type inventoryRules = {
  general: generalRules;
  armor: {
    general: generalRules;
    defense: number[] | 'any';
    soak: number[] | 'any';
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
  weapons: {
    general: generalRules;
    category: number[] | 'any'; // Key from db
    skill: number[] | 'any'; // Key from db
    damage: number[] | 'any';
    crit: number[] | 'any';
    range: number[] | 'any'; // Key from db
    encumbrance: number[] | 'any';
    hardpoints: number[] | 'any';
  };
};

export type shopRules = {
  inventoryRules: inventoryRules;
  location: number;
};
