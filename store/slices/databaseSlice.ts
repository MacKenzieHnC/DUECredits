import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {createSelector} from '@reduxjs/toolkit';
import {
  ArmorItem,
  AttachmentItem,
  DBState,
  GearItem,
  StarshipItem,
  VehicleAttachmentItem,
  WeaponItem,
  PlanetaryVehicleItem,
  VehicleWeaponItem,
} from '../../models/ItemIndex';
import {getDBConnection, getDBState} from '../../services/db-service';
import {getArmorItems} from '../../services/db-service-armor';
import {getAttachmentItems} from '../../services/db-service-attachments';
import {getGearItems} from '../../services/db-service-gear';
import {getPlanetaryVehicleItems} from '../../services/db-service-vehicles';
import {getStarshipItems} from '../../services/db_service-starships';
import {getVehicleAttachmentItems} from '../../services/db-service-vehicleAttachments';
import {getVehicleWeaponItems} from '../../services/db-service-vehicleWeapons';
import {getWeaponItems} from '../../services/db-service-weapons';
import {getAllShops} from '../../services/db-service-shops';
import {Shop} from '../../models/InventoryOptionsIndex';

export const databaseSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'database',
  endpoints: build => ({
    getAllArmor: build.query<ArmorItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getArmorItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Armor", status: 500}};
        }
      },
    }),
    getAllAttachments: build.query<AttachmentItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getAttachmentItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Attachments", status: 500}};
        }
      },
    }),
    getAllGear: build.query<GearItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getGearItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Gear", status: 500}};
        }
      },
    }),
    getAllPlanetaryVehicles: build.query<
      PlanetaryVehicleItem[],
      string | undefined
    >({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getPlanetaryVehicleItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Vehicles", status: 500}};
        }
      },
    }),
    getAllStarships: build.query<StarshipItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getStarshipItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Starships", status: 500}};
        }
      },
    }),
    getAllVehicleAttachments: build.query<
      VehicleAttachmentItem[],
      string | undefined
    >({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getVehicleAttachmentItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Vehicle Attachments", status: 500}};
        }
      },
    }),
    getAllVehicleWeapons: build.query<VehicleWeaponItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getVehicleWeaponItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Vehicle Weapons", status: 500}};
        }
      },
    }),
    getAllWeapons: build.query<WeaponItem[], string | undefined>({
      async queryFn(tableName) {
        try {
          const db = await getDBConnection();
          const data = await getWeaponItems(db, tableName);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Weapons", status: 500}};
        }
      },
    }),
    getDBState: build.query<DBState, void>({
      queryFn: async () => {
        try {
          const db = await getDBConnection();
          const data = await getDBState(db);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get DB State", status: 500}};
        }
      },
    }),
    getAllShops: build.query<Shop[], void>({
      async queryFn() {
        try {
          const db = await getDBConnection();
          const data = await getAllShops(db);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Shop", status: 500}};
        }
      },
    }),
  }),
});

export const selectAllShops = createSelector(
  databaseSlice.endpoints.getAllShops.select(),
  database => database?.data,
);

export const selectShop = (shopID: number) =>
  createSelector(databaseSlice.endpoints.getAllShops.select(), shops =>
    shops?.data?.find(shop => shop.id === shopID),
  );

export const {
  useGetDBStateQuery,
  useGetAllShopsQuery,
  useGetAllArmorQuery,
  useGetAllAttachmentsQuery,
  useGetAllGearQuery,
  useGetAllPlanetaryVehiclesQuery,
  useGetAllStarshipsQuery,
  useGetAllVehicleAttachmentsQuery,
  useGetAllVehicleWeaponsQuery,
  useGetAllWeaponsQuery,
} = databaseSlice;
