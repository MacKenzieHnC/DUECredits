import {ScrollView, View} from 'native-base';
import React, {useState} from 'react';
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
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';

export const ArmorOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['armor']>(
    defaultOptions.inventoryOptions.armor,
  );
  if (!options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['armor']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {
        options: {
          ...defaultOptions,
          inventoryOptions: {
            ...defaultOptions.inventoryOptions,
            armor: newOptions,
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
        defaultOptions={defaultOptions.inventoryOptions.armor.general}
      />
      {/* Defense */}
      <NumericOption
        title={'Defense'}
        state={options.defense}
        defaultOption={defaultOptions.inventoryOptions.armor.defense}
        passBack={(defense: number[] | 'any') =>
          passBack({...options, defense: defense})
        }
      />
      {/* Soak */}
      <NumericOption
        title={'Soak'}
        state={options.soak}
        defaultOption={defaultOptions.inventoryOptions.armor.soak}
        passBack={(soak: number[] | 'any') =>
          passBack({...options, soak: soak})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={options.encumbrance}
        defaultOption={defaultOptions.inventoryOptions.armor.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={options.hardpoints}
        defaultOption={defaultOptions.inventoryOptions.armor.hardpoints}
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
        defaultOption={defaultOptions.inventoryOptions.armor}
        canBeNone={true}
        childComponent={childComponent}
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
