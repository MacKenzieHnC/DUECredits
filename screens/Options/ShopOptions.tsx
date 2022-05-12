import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {Shop, ShopOptions} from '../../models/InventoryOptionsIndex';
import {
  useGetAllShopsQuery,
  useGetShopQuery,
  useUpdateShopRulesMutation,
} from '../../store/slices/databaseSlice';
import {HeaderBackButton} from '@react-navigation/elements';
import {Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {JSONToString} from '../../services/db-service';
import {Text} from 'native-base';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {ArmorOptionsScreen} from './ArmorOptions';
import {AttachmentOptionsScreen} from './AttachmentOptions';
import {GearOptionsScreen} from './GearOptions';
import {GeneralOptionsScreen} from './GeneralOptions';
import {PlanetaryVehicleOptionsScreen} from './PlanetaryVehiclesOptions';
import {StarshipOptionsScreen} from './StarshipOptions';
import {VehicleAttachmentOptionsScreen} from './VehicleAttachmentOptions';
import {VehicleWeaponOptionsScreen} from './VehicleWeaponOptions';
import {WeaponOptionsScreen} from './WeaponOptions';

const confirm = (
  navigation: any,
  update: any,
  options: ShopOptions,
  defaultOptions: ShopOptions,
  id: number,
) => {
  JSONToString(defaultOptions) !== JSONToString(options)
    ? Alert.alert('Save changes?', 'Would you like to save your changes?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'No',
          onPress: () => {
            navigation.dispatch(StackActions.pop(1));
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            update({id: id, data: options});
            navigation.dispatch(StackActions.pop(1));
          },
        },
      ])
    : navigation.dispatch(StackActions.pop(1));
};

export const ShopOptionsScreen = ({navigation, route}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] = useState<ShopOptions>();
  const [options, setOptions] = useState<ShopOptions>();
  useEffect(() => {
    console.log('Effect called');
    if (isLoadingShop === false && shop) {
      setDefaultOptions((shop as Shop).options);
      setOptions((shop as Shop).options);
      console.log('Effect called');
    }
  }, [isLoadingShop, shop]);
  const [update] = useUpdateShopRulesMutation();

  // Override back button to save
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() =>
            confirm(navigation, update, options, defaultOptions, shop.id)
          }
        />
      ),
    });
  }, [defaultOptions, navigation, options, shop?.id, update]);

  // Update local copy of options
  React.useEffect(() => {
    if (route.params) {
      if (route.params.isInventory) {
        setOptions({
          ...options,
          inventoryOptions: {
            ...options.inventoryOptions,
            [route.params.key]: route.params.options,
          },
        });
      } else {
        setOptions({
          ...options,
          [route.params.key]: route.params.options,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  // Wait
  if (isLoadingShop || !shop || !options) {
    return <LoadingScreen text="Loading options..." />;
  }

  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="General" component={GeneralOptionsScreen} />
        <Drawer.Screen name="Armor" component={ArmorOptionsScreen} />
        <Drawer.Screen name="Attachments" component={AttachmentOptionsScreen} />
        <Drawer.Screen name="Gear" component={GearOptionsScreen} />
        <Drawer.Screen name="Weapons" component={WeaponOptionsScreen} />
        <Drawer.Screen
          name="Planetary Vehicles"
          component={PlanetaryVehicleOptionsScreen}
        />
        <Drawer.Screen name="Starships" component={StarshipOptionsScreen} />
        <Drawer.Screen
          name="Vehicle Attachments"
          component={VehicleAttachmentOptionsScreen}
        />
        <Drawer.Screen
          name="Vehicle Weapons"
          component={VehicleWeaponOptionsScreen}
        />
      </Drawer.Navigator>
    </>
  );
};
