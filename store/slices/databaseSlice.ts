import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {ArmorList, DBWeaponsState, WeaponsList} from '../../models/ItemIndex';
import {
  getArmorItems,
  getWeaponItems,
  getDBConnection,
  getDBWeaponsState,
} from '../../services/db-service';

export const databaseSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'database',
  endpoints: build => ({
    getAllArmor: build.query<ArmorList, void>({
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
    getAllWeapons: build.query<
      {list: WeaponsList; state: DBWeaponsState},
      void
    >({
      queryFn: async () => {
        try {
          const db = await getDBConnection();
          const weaponState = await getDBWeaponsState(db);
          const data = await getWeaponItems(db, weaponState, 'Items');
          return {data: {state: weaponState, list: data}};
        } catch (error) {
          return {error: {data: "Can't get Armor", status: 500}};
        }
      },
    }),
  }),
});

export const {useGetAllArmorQuery, useGetAllWeaponsQuery} = databaseSlice;
