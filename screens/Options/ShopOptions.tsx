import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {ShopOptions} from '../../models/InventoryOptionsIndex';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ArmorOptionsScreen} from './ArmorOptions';
import {AttachmentOptionsScreen} from './AttachmentOptions';
import {GearOptionsScreen} from './GearOptions';
import {GeneralOptionsScreen} from './GeneralOptions';
import {PlanetaryVehicleOptionsScreen} from './PlanetaryVehiclesOptions';
import {StarshipOptionsScreen} from './StarshipOptions';
import {VehicleAttachmentOptionsScreen} from './VehicleAttachmentOptions';
import {VehicleWeaponOptionsScreen} from './VehicleWeaponOptions';
import {WeaponOptionsScreen} from './WeaponOptions';

export const ShopOptionsScreen = ({navigation, route}) => {
  //Initialize
  const defaultOptions = useAppSelector(
    selectShop(useAppSelector(selectCurrentShop)),
  ).options;
  const [options, setOptions] = useState<ShopOptions>(defaultOptions);
  React.useEffect(() => {
    if (route.params?.newOptions) {
      setOptions(route.params.newOptions);
    }
  }, [route.params?.newOptions]);
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
