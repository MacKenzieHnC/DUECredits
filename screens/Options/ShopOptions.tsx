import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {InventoryOptions} from '../../models/InventoryOptionsIndex';
import {selectOptions} from '../../store/slices/shopSlice';
import {ArmorOptionsComponent} from './ArmorOptions';
import {WeaponOptionsComponent} from './WeaponOptions';

export const ShopOptionsComponent = ({navigation, route}) => {
  //Initialize
  const defaultOptions = useAppSelector(selectOptions);
  const [options, setOptions] = useState<InventoryOptions>(defaultOptions);
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
    <View flex={1}>
      <Text>
        Armor restricted: {options.armor.general.restricted.toString()}
      </Text>
      <Text>
        Weapon restricted: {options.weapons.general.restricted.toString()}
      </Text>
      <Drawer.Navigator>
        <Drawer.Screen name="Armor" component={ArmorOptionsComponent} />
        <Drawer.Screen name="Weapons" component={WeaponOptionsComponent} />
      </Drawer.Navigator>
    </View>
  );
};
