import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {Shop, ShopOptions} from '../../models/InventoryOptionsIndex';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {
  selectShop,
  useUpdateShopRulesMutation,
} from '../../store/slices/databaseSlice';
import {ArmorOptionsScreen} from './ArmorOptions';
import {AttachmentOptionsScreen} from './AttachmentOptions';
import {GearOptionsScreen} from './GearOptions';
import {GeneralOptionsScreen} from './GeneralOptions';
import {PlanetaryVehicleOptionsScreen} from './PlanetaryVehiclesOptions';
import {StarshipOptionsScreen} from './StarshipOptions';
import {VehicleAttachmentOptionsScreen} from './VehicleAttachmentOptions';
import {VehicleWeaponOptionsScreen} from './VehicleWeaponOptions';
import {WeaponOptionsScreen} from './WeaponOptions';
import {HeaderBackButton} from '@react-navigation/elements';
import {Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';

const confirm = (
  navigation: any,
  update: any,
  options: ShopOptions,
  id: number,
) => {
  Alert.alert('Save changes?', 'Would you like to save your changes?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'No',
      onPress: () => {
        navigation.dispatch(StackActions.popToTop());
      },
    },
    {
      text: 'Yes',
      onPress: () => {
        update({id: id, data: options});
        navigation.dispatch(StackActions.popToTop());
      },
    },
  ]);
};

export const ShopOptionsScreen = ({navigation, route}: any) => {
  //Initialize
  const currentShopID = useAppSelector(selectCurrentShop);
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(currentShopID)) as Shop
  ).options;
  const [options, setOptions] = useState<ShopOptions>(defaultOptions);
  const [update] = useUpdateShopRulesMutation();

  // Override back button to save
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => confirm(navigation, update, options, currentShopID)}
        />
      ),
    });
  }, [currentShopID, navigation, options, update]);

  // Update local copy of options
  React.useEffect(() => {
    if (route.params?.options) {
      setOptions(route.params.options);
    }
  }, [route.params?.options]);

  // Wait
  if (!options) {
    return <LoadingScreen text="Loading options..." />;
  }

  const Drawer = createDrawerNavigator();
  return (
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
  );
};
