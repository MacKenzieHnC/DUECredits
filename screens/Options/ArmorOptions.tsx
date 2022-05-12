import {ScrollView, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {
  GeneralOptions,
  InventoryOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {
  useGetDBStateQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';

export const ArmorOptionsScreen = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [defaultOptions, setDefaultOptions] =
    useState<ShopOptions['inventoryOptions']['armor']>();
  const [options, setOptions] =
    useState<ShopOptions['inventoryOptions']['armor']>();
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();
  useEffect(() => {
    if (isLoadingShop === false && shop) {
      setDefaultOptions((shop as Shop).options.inventoryOptions.armor);
      setOptions((shop as Shop).options.inventoryOptions.armor);
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
  const passBack = (newOptions: InventoryOptions['armor']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {key: 'armor', isInventory: true, options: newOptions},
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
      {/* Defense */}
      <NumericOption
        title={'Defense'}
        state={options.defense}
        defaultOption={defaultOptions.defense}
        passBack={(defense: number[] | 'any') =>
          passBack({...options, defense: defense})
        }
      />
      {/* Soak */}
      <NumericOption
        title={'Soak'}
        state={options.soak}
        defaultOption={defaultOptions.soak}
        passBack={(soak: number[] | 'any') =>
          passBack({...options, soak: soak})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={options.encumbrance}
        defaultOption={defaultOptions.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
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
        title={'Armor'}
        options={options}
        passBack={(armor: InventoryOptions['armor']) => passBack(armor)}
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
