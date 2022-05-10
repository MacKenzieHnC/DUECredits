import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike} from '../../models/ItemIndex';
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

export const PlanetaryVehicleOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['planetaryVehicles']>(
    defaultOptions.inventoryOptions.planetaryVehicles,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['planetaryVehicles']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'planetaryVehicles',
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
        defaultOptions={
          defaultOptions.inventoryOptions.planetaryVehicles.general
        }
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.categories
        }
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.vehicles.categories}
        features={['name']}
      />
      {/* Manufacturer */}
      <MultiSelectOption
        title={'Manufacturers'}
        state={options.manufacturer}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.manufacturer
        }
        passBack={(manufacturer: CategoryLike[] | 'any') =>
          passBack({...options, manufacturer: manufacturer})
        }
        items={dbState.vehicles.manufacturers}
        features={['name']}
      />
      {/* Silhouette */}
      <NumericOption
        title={'Silhouette'}
        state={options.silhouette}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.silhouette
        }
        passBack={(silhouette: number[] | 'any') =>
          passBack({...options, silhouette: silhouette})
        }
      />
      {/* Speed */}
      <NumericOption
        title={'Speed'}
        state={options.speed}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles.speed}
        passBack={(speed: number[] | 'any') =>
          passBack({...options, speed: speed})
        }
      />
      {/* Handling */}
      <NumericOption
        title={'Handling'}
        state={options.handling}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.handling
        }
        passBack={(handling: number[] | 'any') =>
          passBack({...options, handling: handling})
        }
      />
      {/* Armor */}
      <NumericOption
        title={'Armor'}
        state={options.armor}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles.armor}
        passBack={(armor: number[] | 'any') =>
          passBack({...options, armor: armor})
        }
      />
      {/* HTT */}
      <NumericOption
        title={'HTT'}
        state={options.htt}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles.htt}
        passBack={(htt: number[] | 'any') => passBack({...options, htt: htt})}
      />
      {/* SST */}
      <NumericOption
        title={'SST'}
        state={options.sst}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles.sst}
        passBack={(sst: number[] | 'any') => passBack({...options, sst: sst})}
      />
      {/* Sensor */}
      <MultiSelectOption
        title={'Sensors'}
        state={options.sensors}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.sensors
        }
        passBack={(sensors: CategoryLike[] | 'any') =>
          passBack({...options, sensors: sensors})
        }
        items={dbState.vehicles.ranges}
        features={['name']}
      />
      {/* Crew */}
      <NumericOption
        title={'Crew'}
        state={options.crew}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles.crew}
        passBack={(crew: number[] | 'any') =>
          passBack({...options, crew: crew})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={options.encumbrance}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.encumbrance
        }
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Passengers */}
      <NumericOption
        title={'Passengers'}
        state={options.passengers}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.passengers
        }
        passBack={(passengers: number[] | 'any') =>
          passBack({...options, passengers: passengers})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={options.hardpoints}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.hardpoints
        }
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
      {/* Weapons */}
      <NumericOption
        title={'Weapons'}
        state={options.weapons}
        defaultOption={
          defaultOptions.inventoryOptions.planetaryVehicles.weapons
        }
        passBack={(weapons: number[] | 'any') =>
          passBack({...options, weapons: weapons})
        }
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'Planetary Vehicles'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions.inventoryOptions.planetaryVehicles}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
