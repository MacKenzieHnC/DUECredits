import React, {useState} from 'react';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectOptions} from '../../store/slices/shopSlice';
import {ScrollView} from 'native-base';
import {GeneralOptions, ShopOptions} from '../../models/InventoryOptionsIndex';
import {SelectOption} from '../../components/options/SelectOption';

export const GeneralOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(selectOptions);
  const [options, setOptions] = useState<ShopOptions>(defaultOptions);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: ShopOptions) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {newOptions: {newOptions}},
      merge: true,
    });
  };

  return (
    <ScrollView>
      <SelectOption
        title="Location"
        state={options.location}
        passBack={(location: number) =>
          passBack({...options, location: location})
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
            ...options,
            inventoryOptions: {...options.inventoryOptions, general: general},
          })
        }
        defaultOptions={defaultOptions.inventoryOptions.general}
      />
    </ScrollView>
  );
};
