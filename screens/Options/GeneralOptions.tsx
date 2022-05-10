import React, {useState} from 'react';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ScrollView} from 'native-base';
import {
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {SelectOption} from '../../components/options/SelectOption';

export const GeneralOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<ShopOptions>(defaultOptions);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  if (options === undefined) {
    throw Error('HERE');
  }

  // Function to alert shop of changes
  const passBack = (newOptions: ShopOptions) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {options: newOptions},
      merge: false,
    });
  };

  return (
    <ScrollView>
      <SelectOption
        title="Location"
        state={options.location}
        passBack={(location: number) =>
          passBack({
            ...defaultOptions,
            location: location,
          })
        }
        items={dbState.locations}
        features={['name', 'price_modifier', 'rarity_modifier']}
        featureNames={['', 'Price Modifier', 'Rarity Modifier']}
      />
      <GeneralOptionsComponent
        title={'General Options'}
        options={options.inventoryOptions.general}
        passBack={(general: GeneralOptions) =>
          passBack({
            ...defaultOptions,
            inventoryOptions: {
              ...defaultOptions.inventoryOptions,
              general: general,
            },
          })
        }
        defaultOptions={defaultOptions.inventoryOptions.general}
      />
    </ScrollView>
  );
};
