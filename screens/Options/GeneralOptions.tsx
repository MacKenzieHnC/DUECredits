import React, {useState} from 'react';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectOptions} from '../../store/slices/shopSlice';
import {ScrollView} from 'native-base';
import {
  GeneralOptions,
  InventoryOptions,
} from '../../models/InventoryOptionsIndex';

export const GeneralOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(selectOptions);
  const [options, setOptions] = useState<InventoryOptions['general']>(
    defaultOptions.general,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['general']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {newOptions: {...defaultOptions, general: newOptions}},
      merge: true,
    });
  };

  return (
    <ScrollView>
      <GeneralOptionsComponent
        title={'General Options'}
        options={options}
        passBack={(general: GeneralOptions) => passBack(general)}
        defaultOptions={defaultOptions.general}
      />
    </ScrollView>
  );
};
