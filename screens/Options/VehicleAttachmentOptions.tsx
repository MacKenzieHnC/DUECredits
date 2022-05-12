import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
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

export const VehicleAttachmentOptionsScreen = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] =
    useState<ShopOptions['inventoryOptions']['vehicleAttachments']>();
  const [options, setOptions] =
    useState<ShopOptions['inventoryOptions']['vehicleAttachments']>();
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  useEffect(() => {
    if (isLoadingShop === false && shop) {
      setDefaultOptions(
        (shop as Shop).options.inventoryOptions.vehicleAttachments,
      );
      setOptions((shop as Shop).options.inventoryOptions.vehicleAttachments);
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
  const passBack = (newOptions: InventoryOptions['vehicleAttachments']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        key: 'vehicleAttachments',
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
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={options.hardpoints}
        defaultOption={defaultOptions.hardpoints}
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'VehicleAttachments'}
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
