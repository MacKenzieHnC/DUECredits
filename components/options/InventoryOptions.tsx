import {View, VStack} from 'native-base';
import React from 'react';
import {
  GeneralOptions,
  InventoryOptions,
} from '../../models/InventoryOptionsIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../LoadingScreen';
import {GeneralOptionsComponent} from './GeneralOptions';
import {WeaponOptionsScreen} from '../../screens/Options/WeaponOptions';
import {ArmorOptionsScreen} from '../../screens/Options/ArmorOptions';

interface InventoryOptionsProps {
  options: InventoryOptions;
  setOptions: Function;
  defaultOptions: InventoryOptions;
  anyOptions: InventoryOptions;
}

export const InventoryOptionsComponent: React.FC<InventoryOptionsProps> = ({
  options,
  setOptions,
  defaultOptions,
  anyOptions,
}) => {
  // General options
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();

  if (isLoadingDB || !dbState) {
    return <LoadingScreen text={'Loading DB'} />;
  }

  return (
    <VStack space={3}>
      <View>
        <GeneralOptionsComponent
          title={'General Options'}
          options={options.general}
          setOptions={(general: GeneralOptions) =>
            setOptions({...options, general: general})
          }
          defaultOptions={defaultOptions.general}
          anyOptions={anyOptions.general}
        />
      </View>
      <ArmorOptionsScreen
        options={options.armor}
        setOptions={(armor: InventoryOptions['armor']) =>
          setOptions({...options, armor: armor})
        }
        defaultOptions={defaultOptions}
        anyOptions={anyOptions}
      />
      <WeaponOptionsScreen
        options={options.weapons}
        setOptions={(weapons: InventoryOptions['weapons']) =>
          setOptions({...options, weapons: weapons})
        }
        defaultOptions={defaultOptions}
        anyOptions={anyOptions}
        dbState={dbState.weapons}
      />
    </VStack>
  );
};
