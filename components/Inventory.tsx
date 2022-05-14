import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {Button} from 'native-base';
import {useAppSelector} from '../hooks/redux';
import {Shop} from '../models/InventoryOptionsIndex';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {
  useGetShopQuery,
  useGetDBStateQuery,
  useGenerateInventoryMutation,
} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {ArmorInventory} from '../screens/Inventory/ArmorInventory';
import {AttachmentInventory} from '../screens/Inventory/AttachmentInventory';
import {GearInventory} from '../screens/Inventory/GearInventory';
import {PlanetaryVehicleInventory} from '../screens/Inventory/PlanetaryVehicleInventory';
import {StarshipInventory} from '../screens/Inventory/StarshipsInventory';
import {VehicleAttachmentsInventory} from '../screens/Inventory/VehicleAttachmentsInventory';
import {VehicleWeaponsInventory} from '../screens/Inventory/VehicleWeaponsInventory';
import {WeaponInventory} from '../screens/Inventory/WeaponInventory';

const Drawer = createDrawerNavigator();

const generateShop = async (
  shop: Shop,
  generateInventory: MutationTrigger<any>,
) => {
  await generateInventory({
    shop: shop,
    character: {
      legalCharacteristic: 3,
      legalStat: 1,
      illegalCharacteristic: 3,
      illegalStat: 1,
      numBoosts: 0,
      numSetbacks: 0,
    },
  });
};

export const Inventory = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  const [generateInventory] = useGenerateInventoryMutation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={async () => await generateShop(shop, generateInventory)}>
          Generate Inventory!
        </Button>
      ),
    });
  }, [generateInventory, navigation, shop]);
  if (isLoadingDB || !dbState || isLoadingShop || !shop) {
    return <LoadingScreen text="Loading shop" />;
  }
  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed">
      <Drawer.Screen name={'Armor'} component={ArmorInventory} />
      <Drawer.Screen name={'Attachments'} component={AttachmentInventory} />
      <Drawer.Screen name={'Gear'} component={GearInventory} />
      <Drawer.Screen
        name={'Planetary Vehicles'}
        component={PlanetaryVehicleInventory}
      />
      <Drawer.Screen name={'Starships'} component={StarshipInventory} />
      <Drawer.Screen
        name={'Vehicle Attachments'}
        component={VehicleAttachmentsInventory}
      />
      <Drawer.Screen
        name={'Vehicle Weapons'}
        component={VehicleWeaponsInventory}
      />
      <Drawer.Screen name={'Weapons'} component={WeaponInventory} />
    </Drawer.Navigator>
  );
};
