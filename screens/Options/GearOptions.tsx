import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike} from '../../models/ItemIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {MultiSelectOption} from '../../components/options/MultiSelectOption';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ScrollView} from 'native-base';

export const GearOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['gear']>(
    defaultOptions.inventoryOptions.gear,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['gear']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        options: {
          ...defaultOptions,
          inventoryOptions: {
            ...defaultOptions.inventoryOptions,
            gear: newOptions,
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
        defaultOptions={defaultOptions.inventoryOptions.gear.general}
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={defaultOptions.inventoryOptions.gear.categories}
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.vehicles.categories}
        features={['name']}
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={defaultOptions.inventoryOptions.gear.encumbrance}
        defaultOption={defaultOptions.inventoryOptions.gear.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'Gear'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions.inventoryOptions.gear}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
