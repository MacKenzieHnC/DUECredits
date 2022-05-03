import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {ArmorItem, DBState, WeaponItem} from '../../models/ItemIndex';
import {getDBConnection, getDBState} from '../../services/db-service';
import {getArmorItems} from '../../services/db-service-armor';
import {getWeaponItems} from '../../services/db-service-weapons';

export const databaseSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'database',
  endpoints: build => ({
    getAllArmor: build.query<ArmorItem[], void>({
      queryFn: async () => {
        try {
          const db = await getDBConnection();
          const data = await getArmorItems(db, 'Items');
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Armor", status: 500}};
        }
      },
    }),
    getAllWeapons: build.query<WeaponItem[], void>({
      queryFn: async () => {
        try {
          const db = await getDBConnection();
          const data = await getWeaponItems(db, 'Items');
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
  }),
});

export const {useGetDBStateQuery, useGetAllArmorQuery, useGetAllWeaponsQuery} =
  databaseSlice;
