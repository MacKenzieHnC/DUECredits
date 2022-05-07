import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike} from '../../models/ItemIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {MultiSelectOption} from '../../components/options/MultiSelectOption';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectOptions} from '../../store/slices/shopSlice';
import {ScrollView} from 'native-base';

export const PlanetaryVehicleOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(selectOptions);
  const [options, setOptions] = useState<InventoryOptions['planetaryVehicles']>(
    defaultOptions.planetaryVehicles,
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
      params: {newOptions: {...defaultOptions, planetaryVehicles: newOptions}},
      merge: true,
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
        options={options.categories}
        state={dbState.vehicles.categories}
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.vehicles.categories}
      />
      {/* Manufacturer */}
      <MultiSelectOption
        title={'Manufacturers'}
        options={options.manufacturer}
        state={dbState.vehicles.manufacturers}
        passBack={(manufacturer: CategoryLike[] | 'any') =>
          passBack({...options, manufacturer: manufacturer})
        }
        items={dbState.vehicles.manufacturers}
      />
      {/* Silhouette */}
      <NumericOption
        title={'Silhouette'}
        options={options.silhouette}
        state={defaultOptions.silhouette}
        passBack={(silhouette: number[] | 'any') =>
          passBack({...options, silhouette: silhouette})
        }
      />
      {/* Speed */}
      <NumericOption
        title={'Speed'}
        options={options.speed}
        state={defaultOptions.speed}
        passBack={(speed: number[] | 'any') =>
          passBack({...options, speed: speed})
        }
      />
      {/* Handling */}
      <NumericOption
        title={'Handling'}
        options={options.handling}
        state={defaultOptions.handling}
        passBack={(handling: number[] | 'any') =>
          passBack({...options, handling: handling})
        }
      />
      {/* Armor */}
      <NumericOption
        title={'Armor'}
        options={options.armor}
        state={defaultOptions.armor}
        passBack={(armor: number[] | 'any') =>
          passBack({...options, armor: armor})
        }
      />
      {/* HTT */}
      <NumericOption
        title={'HTT'}
        options={options.htt}
        state={defaultOptions.htt}
        passBack={(htt: number[] | 'any') => passBack({...options, htt: htt})}
      />
      {/* SST */}
      <NumericOption
        title={'SST'}
        options={options.sst}
        state={defaultOptions.sst}
        passBack={(sst: number[] | 'any') => passBack({...options, sst: sst})}
      />
      {/* Sensor */}
      <MultiSelectOption
        title={'Sensors'}
        options={options.sensors}
        state={dbState.vehicles.ranges}
        passBack={(sensors: CategoryLike[] | 'any') =>
          passBack({...options, sensors: sensors})
        }
        items={dbState.vehicles.ranges}
      />
      {/* Crew */}
      <NumericOption
        title={'Crew'}
        options={options.crew}
        state={defaultOptions.crew}
        passBack={(crew: number[] | 'any') =>
          passBack({...options, crew: crew})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options.encumbrance}
        state={defaultOptions.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Passengers */}
      <NumericOption
        title={'Passengers'}
        options={options.passengers}
        state={defaultOptions.passengers}
        passBack={(passengers: number[] | 'any') =>
          passBack({...options, passengers: passengers})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options.hardpoints}
        state={defaultOptions.hardpoints}
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
      {/* Weapons */}
      <NumericOption
        title={'Weapons'}
        options={options.weapons}
        state={defaultOptions.weapons}
        passBack={(weapons: number[] | 'any') =>
          passBack({...options, weapons: weapons})
        }
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'PlanetaryVehicles'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
      />
    </ScrollView>
  );
};
