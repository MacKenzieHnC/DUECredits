import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {DBState, ITEM_TYPE, Location} from '../../models/ItemIndex';
import {
  getAllPossibleItems,
  getDBConnection,
  getDBState,
} from '../../services/db-service';
import {
  getAllShops,
  getShop,
  getShopInventory,
  newShop,
  resetRules,
  setShopInventory,
  updateRules,
} from '../../services/db-service-shops';
import {Shop, ShopOptions} from '../../models/InventoryOptionsIndex';
import {getConstraints} from '../../services/db-service-constraints';
import {currentShopChanged} from './appSlice';
import {store} from '..';

export interface MutateShopProps {
  id: number;
  options: ShopOptions;
}

export const databaseSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'database',
  tagTypes: ['Shops', 'Inventory', 'Items'],
  endpoints: build => ({
    getAllItems: build.query<any, Shop>({
      async queryFn(shop) {
        try {
          const db = await getDBConnection();
          const data = await getAllPossibleItems(
            db,
            getConstraints(shop.options),
          );
          return {data: data};
        } catch (error) {
          return {error: {data: "Can't get Items", status: 500}};
        }
      },
      providesTags: ['Inventory', 'Shops', 'Items'],
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
    getShop: build.query<Shop, number>({
      async queryFn(id) {
        try {
          const db = await getDBConnection();
          const data = await getShop(db, id);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Shop", status: 500}};
        }
      },
      providesTags: ['Shops'],
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
      providesTags: ['Shops'],
    }),
    updateShopRules: build.mutation<null, {id: number; data: ShopOptions}>({
      queryFn: async ({id, data}) => {
        try {
          const db = await getDBConnection();
          await updateRules(db, id, data);
        } catch (error) {
        } finally {
          return {data: null};
        }
      },
      invalidatesTags: ['Shops'],
    }),
    resetShopRules: build.mutation<null, number>({
      queryFn: async id => {
        try {
          const db = await getDBConnection();
          await resetRules(db, id);
        } catch (error) {
        } finally {
          return {data: null};
        }
      },
      invalidatesTags: ['Shops'],
    }),
    getInventory: build.query<
      any[][] | undefined,
      {shop: Shop; location: Location} | undefined
    >({
      async queryFn(props) {
        if (!props) {
          return {data: Array(ITEM_TYPE.length).fill([])};
        }
        try {
          const db = await getDBConnection();
          const data = await getShopInventory(db, props.shop, props.location);
          return {data: data};
        } catch (error) {
          return {error: {data: "Can't get Inventory", status: 500}};
        }
      },
      providesTags: ['Shops', 'Inventory'],
    }),
    saveNewShop: build.mutation<null, string>({
      queryFn: async name => {
        try {
          const db = await getDBConnection();
          const data = await newShop(db, name);
          store.dispatch(currentShopChanged(data));
        } catch (error) {
        } finally {
          return {data: null};
        }
      },
      invalidatesTags: ['Shops'],
    }),
    setShopInventory: build.mutation<null, {shop: Shop; itemLists: any[][]}>({
      queryFn: async props => {
        try {
          const db = await getDBConnection();
          await setShopInventory(db, props.shop, props.itemLists);
        } catch (error) {
        } finally {
          return {data: null};
        }
      },
      invalidatesTags: ['Inventory'],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetDBStateQuery,
  useSaveNewShopMutation,
  useGetShopQuery,
  useGetAllShopsQuery,
  useUpdateShopRulesMutation,
  useResetShopRulesMutation,
  useGetInventoryQuery,
  useSetShopInventoryMutation,
} = databaseSlice;
