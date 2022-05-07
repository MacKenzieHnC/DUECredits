import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
} from '../../models/InventoryOptionsIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectOptions} from '../../store/slices/shopSlice';
import {ScrollView} from 'native-base';

export const VehicleAttachmentOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(selectOptions);
  const [options, setOptions] = useState<
    InventoryOptions['vehicleAttachments']
  >(defaultOptions.vehicleAttachments);
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['vehicleAttachments']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {newOptions: {...defaultOptions, vehicleAttachments: newOptions}},
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
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options.hardpoints}
        state={defaultOptions.hardpoints}
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
      />
    </ScrollView>
  );
};
