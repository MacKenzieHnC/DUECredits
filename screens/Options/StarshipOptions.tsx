import React, {useEffect, useState} from 'react';
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
import {
  useGetDBStateQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {ScrollView} from 'native-base';
import {selectCurrentShopID} from '../../store/slices/appSlice';

export const StarshipOptionsScreen = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] =
    useState<ShopOptions['inventoryOptions']['starships']>();
  const [options, setOptions] =
    useState<ShopOptions['inventoryOptions']['starships']>();
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  useEffect(() => {
    if (isLoadingShop === false && shop) {
      setDefaultOptions((shop as Shop).options.inventoryOptions.starships);
      setOptions((shop as Shop).options.inventoryOptions.starships);
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
  const passBack = (newOptions: InventoryOptions['starships']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'starships',
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
        items={dbState.vehicles.categories}
        features={['name']}
      />
      {/* Manufacturer */}
      <MultiSelectOption
        title={'Manufacturers'}
        state={options.manufacturer}
        defaultOption={defaultOptions.manufacturer}
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
        defaultOption={defaultOptions.silhouette}
        passBack={(silhouette: number[] | 'any') =>
          passBack({...options, silhouette: silhouette})
        }
      />
      {/* Speed */}
      <NumericOption
        title={'Speed'}
        state={options.speed}
        defaultOption={defaultOptions.speed}
        passBack={(speed: number[] | 'any') =>
          passBack({...options, speed: speed})
        }
      />
      {/* Handling */}
      <NumericOption
        title={'Handling'}
        state={options.handling}
        defaultOption={defaultOptions.handling}
        passBack={(handling: number[] | 'any') =>
          passBack({...options, handling: handling})
        }
      />
      {/* Armor */}
      <NumericOption
        title={'Armor'}
        state={options.armor}
        defaultOption={defaultOptions.armor}
        passBack={(armor: number[] | 'any') =>
          passBack({...options, armor: armor})
        }
      />
      {/* HTT */}
      <NumericOption
        title={'HTT'}
        state={options.htt}
        defaultOption={defaultOptions.htt}
        passBack={(htt: number[] | 'any') => passBack({...options, htt: htt})}
      />
      {/* SST */}
      <NumericOption
        title={'SST'}
        state={options.sst}
        defaultOption={defaultOptions.sst}
        passBack={(sst: number[] | 'any') => passBack({...options, sst: sst})}
      />
      {/* Sensor */}
      <MultiSelectOption
        title={'Sensors'}
        state={options.sensors}
        defaultOption={defaultOptions.sensors}
        passBack={(sensors: CategoryLike[] | 'any') =>
          passBack({...options, sensors: sensors})
        }
        items={dbState.vehicles.sensors}
        features={['name']}
      />
      {/* Crew */}
      <NumericOption
        title={'Crew'}
        state={options.crew}
        defaultOption={defaultOptions.crew}
        passBack={(crew: number[] | 'any') =>
          passBack({...options, crew: crew})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={options.encumbrance}
        defaultOption={defaultOptions.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Passengers */}
      <NumericOption
        title={'Passengers'}
        state={options.passengers}
        defaultOption={defaultOptions.passengers}
        passBack={(passengers: number[] | 'any') =>
          passBack({...options, passengers: passengers})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={options.hardpoints}
        defaultOption={defaultOptions.hardpoints}
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
      {/* Weapons */}
      <NumericOption
        title={'Weapons'}
        state={options.weapons}
        defaultOption={defaultOptions.weapons}
        passBack={(weapons: number[] | 'any') =>
          passBack({...options, weapons: weapons})
        }
      />
      {/* Navicomputer */}
      <MultiSelectOption
        title={'Navicomputer'}
        state={options.navicomputer}
        defaultOption={defaultOptions.navicomputer}
        passBack={(navicomputer: CategoryLike[] | 'any') =>
          passBack({...options, navicomputer: navicomputer})
        }
        items={dbState.vehicles.sensors}
        features={['name']}
      />
      {/* Additional Rules */}
      <MultiSelectOption
        title={'Additional Rules'}
        state={options.additionalRules}
        defaultOption={defaultOptions.additionalRules}
        passBack={(additionalRules: AdditionalRule[] | 'any') =>
          passBack({...options, additionalRules: additionalRules})
        }
        items={dbState.additional_rules}
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
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
