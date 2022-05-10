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

  // Function to alert shop of changes
  const passBackLocation = (newOptions: ShopOptions['location']) => {
    setOptions({...options, location: newOptions});
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'location',
        isInventory: false,
        options: newOptions,
      },
    });
  };

  // Function to alert shop of changes
  const passBackGeneral = (newOptions: GeneralOptions) => {
    setOptions({
      ...options,
      inventoryOptions: {...options.inventoryOptions, general: newOptions},
    });
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'general',
        isInventory: true,
        options: newOptions,
      },
    });
  };

  return (
    <ScrollView>
      <SelectOption
        key={0}
        title="Location"
        state={options.location}
        passBack={(location: number) => passBackLocation(location)}
        items={dbState.locations}
        features={['name', 'price_modifier', 'rarity_modifier']}
        featureNames={['', 'Price Modifier', 'Rarity Modifier']}
      />
      <GeneralOptionsComponent
        key={1}
        title={'General Options'}
        options={options.inventoryOptions.general}
        passBack={(general: GeneralOptions) => passBackGeneral(general)}
        defaultOptions={defaultOptions.inventoryOptions.general}
      />
    </ScrollView>
  );
};
