import React, {useEffect, useState} from 'react';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {
  useGetDBStateQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {ScrollView} from 'native-base';
import {
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {SelectOption} from '../../components/options/SelectOption';
import {selectCurrentShopID} from '../../store/slices/appSlice';

export const GeneralOptionsScreen = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] = useState<ShopOptions>();
  const [options, setOptions] = useState<ShopOptions>();
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  useEffect(() => {
    if (isLoadingShop === false && shop) {
      setDefaultOptions((shop as Shop).options);
      setOptions((shop as Shop).options);
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
        items={dbState.location}
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
