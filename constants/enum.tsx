export const VEHICLE_TYPE = {
  Planetary: 0,
  Spaceship: 1,
};

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
