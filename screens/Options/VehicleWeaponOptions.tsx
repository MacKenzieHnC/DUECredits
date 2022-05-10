import React, {useState} from 'react';
import {View} from 'react-native';
import {
  GeneralOptions,
  InventoryOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike, WeaponEffect} from '../../models/ItemIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {MultiSelectOption} from '../../components/options/MultiSelectOption';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ScrollView} from 'native-base';

export const VehicleWeaponOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['vehicleWeapons']>(
    defaultOptions.inventoryOptions.vehicleWeapons,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['vehicleWeapons']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'vehicleWeapons',
        isInventory: true,
        options: newOptions,
      },
    });
  };

  const childComponent = (
    <View>
      <GeneralOptionsComponent
        title={'General Options'}
        options={options.general}
        passBack={(general: GeneralOptions) =>
          passBack({...options, general: general})
        }
        defaultOptions={defaultOptions.inventoryOptions.vehicleWeapons.general}
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={
          defaultOptions.inventoryOptions.vehicleWeapons.categories
        }
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.weapons.categories}
        features={['name']}
      />
      {/* Range */}
      <MultiSelectOption
        title={'Ranges'}
        state={options.ranges}
        defaultOption={defaultOptions.inventoryOptions.vehicleWeapons.ranges}
        passBack={(ranges: CategoryLike[] | 'any') =>
          passBack({...options, ranges: ranges})
        }
        items={dbState.vehicles.ranges}
        features={['name']}
      />
      {/* Damage */}
      <NumericOption
        title={'Damage'}
        state={options.damage}
        defaultOption={defaultOptions.inventoryOptions.vehicleWeapons.damage}
        passBack={(damage: number[] | 'any') =>
          passBack({...options, damage: damage})
        }
      />
      {/* Crit */}
      <NumericOption
        title={'Crit'}
        state={options.crit}
        defaultOption={defaultOptions.inventoryOptions.vehicleWeapons.crit}
        passBack={(crit: number[] | 'any') =>
          passBack({...options, crit: crit})
        }
      />
      {/* Compatible Silhouette */}
      <NumericOption
        title={'Compatible Silhouette'}
        state={options.compatibleSilhouette}
        defaultOption={
          defaultOptions.inventoryOptions.vehicleWeapons.compatibleSilhouette
        }
        passBack={(compatibleSilhouette: number[] | 'any') =>
          passBack({...options, compatibleSilhouette: compatibleSilhouette})
        }
      />
      {/* Effect */}
      <MultiSelectOption
        title={'Effects'}
        state={options.effects}
        defaultOption={defaultOptions.inventoryOptions.vehicleWeapons.effects}
        passBack={(effects: WeaponEffect[] | 'any') =>
          passBack({...options, effects: effects})
        }
        items={dbState.weapons.effects}
        features={['name']}
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'VehicleWeapons'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
