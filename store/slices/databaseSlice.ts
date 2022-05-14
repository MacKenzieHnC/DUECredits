import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
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
import {
  getAllPossibleItems,
  getDBConnection,
  getDBState,
  JSONToString,
} from '../../services/db-service';
import {getArmorItems} from '../../services/db-service-armor';
import {getAttachmentItems} from '../../services/db-service-attachments';
import {getGearItems} from '../../services/db-service-gear';
import {getPlanetaryVehicleItems} from '../../services/db-service-vehicles';
import {getStarshipItems} from '../../services/db_service-starships';
import {getVehicleAttachmentItems} from '../../services/db-service-vehicleAttachments';
import {getVehicleWeaponItems} from '../../services/db-service-vehicleWeapons';
import {getWeaponItems} from '../../services/db-service-weapons';
import {
  getAllShops,
  getShop,
  getShopInventory,
  resetRules,
  setShopInventory,
  updateRules,
} from '../../services/db-service-shops';
import {Shop, ShopOptions} from '../../models/InventoryOptionsIndex';
import {getConstraints} from '../../services/db-service-constraints';
import {getDicePool, getDiceRoll} from '../../Dice/Dice';

export interface MutateShopProps {
  id: number;
  options: ShopOptions;
}

export const databaseSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'database',
  tagTypes: ['Shops', 'Inventory'],
  endpoints: build => ({
    getAllArmor: build.query<ArmorItem[], Shop>({
      async queryFn(shop) {
        try {
          const db = await getDBConnection();
          const data = await getArmorItems(db, shop);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Armor", status: 500}};
        }
      },
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
      providesTags: ['Inventory'],
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
          updateRules(db, id, data);
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
          resetRules(db, id);
        } catch (error) {
        } finally {
          return {data: null};
        }
      },
      invalidatesTags: ['Shops'],
    }),
    getInventory: build.query<Array<any>, Shop>({
      async queryFn(shop) {
        try {
          const db = await getDBConnection();
          const data = await getShopInventory(db, shop);
          return {data};
        } catch (error) {
          return {error: {data: "Can't get Shop", status: 500}};
        }
      },
      providesTags: ['Shops'],
    }),
    generateInventory: build.mutation<
      null,
      {
        shop: Shop;
        character: {
          legalCharacteristic: number;
          legalStat: number;
          illegalCharacteristic: number;
          illegalStat: number;
          numBoosts: number;
          numSetbacks: number;
        };
      }
    >({
      queryFn: async props => {
        try {
          const db = await getDBConnection();
          var items = await getAllPossibleItems(
            db,
            getConstraints(props.shop.options),
          );
          console.log('List length: ', items.length);
          for (let i = 0; i < items.length; i++) {
            const characteristic = items[i].restricted
              ? props.character.illegalCharacteristic
              : props.character.legalCharacteristic;
            const stat = items[i].restricted
              ? props.character.illegalStat
              : props.character.legalStat;
            items[i].roll = getDiceRoll(
              getDicePool(
                stat,
                characteristic,
                items[i].rarity,
                props.character.numBoosts,
                props.character.numSetbacks,
              ),
            );
            console.log(
              'Dicepool: ',
              JSONToString(
                getDicePool(
                  stat,
                  characteristic,
                  items[i].rarity,
                  props.character.numBoosts,
                  props.character.numSetbacks,
                ),
              ),
            );
          }
          items = items.filter(
            item => item.roll.successes > item.roll.failures,
          );
          setShopInventory(db, props.shop, items);
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
  useGetDBStateQuery,
  useGetShopQuery,
  useGetAllShopsQuery,
  useUpdateShopRulesMutation,
  useResetShopRulesMutation,
  useGenerateInventoryMutation,
  useGetInventoryQuery,
  useGetAllArmorQuery,
  useGetAllAttachmentsQuery,
  useGetAllGearQuery,
  useGetAllPlanetaryVehiclesQuery,
  useGetAllStarshipsQuery,
  useGetAllVehicleAttachmentsQuery,
  useGetAllVehicleWeaponsQuery,
  useGetAllWeaponsQuery,
} = databaseSlice;
