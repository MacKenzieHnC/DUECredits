import React, {useEffect, useState} from 'react';
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
import {
  useGetDBStateQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {ScrollView} from 'native-base';

export const VehicleWeaponOptionsScreen = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] =
    useState<ShopOptions['inventoryOptions']['vehicleWeapons']>();
  const [options, setOptions] =
    useState<ShopOptions['inventoryOptions']['vehicleWeapons']>();
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  useEffect(() => {
    if (isLoadingShop === false && shop) {
      setDefaultOptions((shop as Shop).options.inventoryOptions.vehicleWeapons);
      setOptions((shop as Shop).options.inventoryOptions.vehicleWeapons);
    }
  }, [isLoadingShop, shop]);
  if (
    isLoadingDB ||
    !dbState ||
    isLoadingShop ||
    !shop ||
    !options ||
    !defaultOptions
  ) {
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
        defaultOptions={defaultOptions.general}
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={defaultOptions.categories}
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.weapons.category}
        features={['name']}
      />
      {/* Range */}
      <MultiSelectOption
        title={'Ranges'}
        state={options.ranges}
        defaultOption={defaultOptions.ranges}
        passBack={(ranges: CategoryLike[] | 'any') =>
          passBack({...options, ranges: ranges})
        }
        items={dbState.vehicles.sensor}
        features={['name']}
      />
      {/* Damage */}
      <NumericOption
        title={'Damage'}
        state={options.damage}
        defaultOption={defaultOptions.damage}
        passBack={(damage: number[] | 'any') =>
          passBack({...options, damage: damage})
        }
      />
      {/* Crit */}
      <NumericOption
        title={'Crit'}
        state={options.crit}
        defaultOption={defaultOptions.crit}
        passBack={(crit: number[] | 'any') =>
          passBack({...options, crit: crit})
        }
      />
      {/* Compatible Silhouette */}
      <NumericOption
        title={'Compatible Silhouette'}
        state={options.compatibleSilhouette}
        defaultOption={defaultOptions.compatibleSilhouette}
        passBack={(compatibleSilhouette: number[] | 'any') =>
          passBack({...options, compatibleSilhouette: compatibleSilhouette})
        }
      />
      {/* Effect */}
      <MultiSelectOption
        title={'Effects'}
        state={options.effects}
        defaultOption={defaultOptions.effects}
        passBack={(effects: WeaponEffect[] | 'any') =>
          passBack({...options, effects: effects})
        }
        items={dbState.weapon_effect}
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
