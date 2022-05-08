import React, {useState} from 'react';
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
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ScrollView} from 'native-base';

export const VehicleAttachmentOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<
    InventoryOptions['vehicleAttachments']
  >(defaultOptions.inventoryOptions.vehicleAttachments);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['vehicleAttachments']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        options: {
          ...defaultOptions,
          inventoryOptions: {
            ...defaultOptions.inventoryOptions,
            vehicleAttachments: newOptions,
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
        defaultOptions={
          defaultOptions.inventoryOptions.vehicleAttachments.general
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={defaultOptions.inventoryOptions.vehicleAttachments.hardpoints}
        defaultOption={
          defaultOptions.inventoryOptions.vehicleAttachments.hardpoints
        }
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
        defaultOption={defaultOptions.inventoryOptions.vehicleAttachments}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
