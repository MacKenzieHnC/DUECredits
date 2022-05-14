export const VEHICLE_TYPE = {
  Planetary: 0,
  Spaceship: 1,
};

export type ItemType = {
  name: string;
  tableName: string;
};

export const ITEM_TYPE: ItemType[] = [
  {name: 'armor', tableName: 'Armor'},
  {name: 'attachments', tableName: 'Attachments'},
  {name: 'gear', tableName: 'Gear'},
  {
    name: 'planetaryVehicles',
    tableName: 'Planetary_Vehicles_View',
  },
  {
    name: 'starships',
    tableName: 'Starships_View',
  },
  {
    name: 'vehicleAttachments',
    tableName: 'Vehicle_Attachments',
  },
  {name: 'vehicleWeapons', tableName: 'Vehicle_Weapons'},
  {name: 'weapons', tableName: 'Weapons'},
];
