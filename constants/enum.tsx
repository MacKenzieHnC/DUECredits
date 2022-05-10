export const VEHICLE_TYPE = {
  Planetary: 0,
  Spaceship: 1,
};

export type ItemType = {
  id: number;
  tableName: string;
};

export const ITEM_TYPE = {
  Armor: {id: 0, tableName: 'Armor'},
  Attachments: {id: 1, tableName: 'Attachments'},
  Gear: {id: 2, tableName: 'Gear'},
  PlanetaryVehicles: {
    id: 3,
    tableName: 'Planetary_Vehicles_View',
  },
  Starships: {
    id: 4,
    tableName: 'Starships_View',
  },
  VehicleAttachments: {
    id: 5,
    tableName: 'Vehicle_Attachments',
  },
  VehicleWeapons: {id: 6, tableName: 'Vehicle_Weapons'},
  Weapons: {id: 7, tableName: 'Weapons_View'},
};
