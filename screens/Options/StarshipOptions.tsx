import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {AdditionalRule, CategoryLike} from '../../models/ItemIndex';
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

export const StarshipOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['starships']>(
    defaultOptions.inventoryOptions.starships,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['starships']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        options: {
          ...defaultOptions,
          inventoryOptions: {
            ...defaultOptions.inventoryOptions,
            starships: newOptions,
          },
        },
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
        defaultOptions={defaultOptions.inventoryOptions.starships.general}
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={defaultOptions.inventoryOptions.starships.categories}
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
        defaultOption={defaultOptions.inventoryOptions.starships.manufacturer}
        passBack={(manufacturer: CategoryLike[] | 'any') =>
          passBack({...options, manufacturer: manufacturer})
        }
        items={dbState.vehicles.manufacturers}
        features={['name']}
      />
      {/* Silhouette */}
      <NumericOption
        title={'Silhouette'}
        state={defaultOptions.inventoryOptions.starships.silhouette}
        defaultOption={defaultOptions.inventoryOptions.starships.silhouette}
        passBack={(silhouette: number[] | 'any') =>
          passBack({...options, silhouette: silhouette})
        }
      />
      {/* Speed */}
      <NumericOption
        title={'Speed'}
        state={defaultOptions.inventoryOptions.starships.speed}
        defaultOption={defaultOptions.inventoryOptions.starships.speed}
        passBack={(speed: number[] | 'any') =>
          passBack({...options, speed: speed})
        }
      />
      {/* Handling */}
      <NumericOption
        title={'Handling'}
        state={defaultOptions.inventoryOptions.starships.handling}
        defaultOption={defaultOptions.inventoryOptions.starships.handling}
        passBack={(handling: number[] | 'any') =>
          passBack({...options, handling: handling})
        }
      />
      {/* Armor */}
      <NumericOption
        title={'Armor'}
        state={defaultOptions.inventoryOptions.starships.armor}
        defaultOption={defaultOptions.inventoryOptions.starships.armor}
        passBack={(armor: number[] | 'any') =>
          passBack({...options, armor: armor})
        }
      />
      {/* HTT */}
      <NumericOption
        title={'HTT'}
        state={defaultOptions.inventoryOptions.starships.htt}
        defaultOption={defaultOptions.inventoryOptions.starships.htt}
        passBack={(htt: number[] | 'any') => passBack({...options, htt: htt})}
      />
      {/* SST */}
      <NumericOption
        title={'SST'}
        state={defaultOptions.inventoryOptions.starships.sst}
        defaultOption={defaultOptions.inventoryOptions.starships.sst}
        passBack={(sst: number[] | 'any') => passBack({...options, sst: sst})}
      />
      {/* Sensor */}
      <MultiSelectOption
        title={'Sensors'}
        state={options.sensors}
        defaultOption={defaultOptions.inventoryOptions.starships.sensors}
        passBack={(sensors: CategoryLike[] | 'any') =>
          passBack({...options, sensors: sensors})
        }
        items={dbState.vehicles.ranges}
        features={['name']}
      />
      {/* Crew */}
      <NumericOption
        title={'Crew'}
        state={defaultOptions.inventoryOptions.starships.crew}
        defaultOption={defaultOptions.inventoryOptions.starships.crew}
        passBack={(crew: number[] | 'any') =>
          passBack({...options, crew: crew})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={defaultOptions.inventoryOptions.starships.encumbrance}
        defaultOption={defaultOptions.inventoryOptions.starships.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Passengers */}
      <NumericOption
        title={'Passengers'}
        state={defaultOptions.inventoryOptions.starships.passengers}
        defaultOption={defaultOptions.inventoryOptions.starships.passengers}
        passBack={(passengers: number[] | 'any') =>
          passBack({...options, passengers: passengers})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={defaultOptions.inventoryOptions.starships.hardpoints}
        defaultOption={defaultOptions.inventoryOptions.starships.hardpoints}
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
      {/* Weapons */}
      <NumericOption
        title={'Weapons'}
        state={defaultOptions.inventoryOptions.starships.weapons}
        defaultOption={defaultOptions.inventoryOptions.starships.weapons}
        passBack={(weapons: number[] | 'any') =>
          passBack({...options, weapons: weapons})
        }
      />
      {/* Navicomputer */}
      <MultiSelectOption
        title={'Navicomputer'}
        state={options.navicomputer}
        defaultOption={defaultOptions.inventoryOptions.starships.navicomputer}
        passBack={(navicomputer: CategoryLike[] | 'any') =>
          passBack({...options, navicomputer: navicomputer})
        }
        items={dbState.vehicles.ranges}
        features={['name']}
      />
      {/* Additional Rules */}
      <MultiSelectOption
        title={'Additional Rules'}
        state={options.additionalRules}
        defaultOption={
          defaultOptions.inventoryOptions.starships.additionalRules
        }
        passBack={(additionalRules: AdditionalRule[] | 'any') =>
          passBack({...options, additionalRules: additionalRules})
        }
        items={dbState.additionalRules}
        features={['name']}
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'Starships'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions.inventoryOptions.starships}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
