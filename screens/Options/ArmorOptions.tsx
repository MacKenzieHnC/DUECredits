import {ScrollView, View} from 'native-base';
import React, {useState} from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {
  GeneralOptions,
  InventoryOptions,
} from '../../models/InventoryOptionsIndex';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';

export const ArmorOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(
    selectShop(useAppSelector(selectCurrentShop)),
  ).options.inventoryOptions;
  const [options, setOptions] = useState<InventoryOptions['armor']>(
    defaultOptions.armor,
  );
  if (!options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['armor']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {newOptions: {...defaultOptions, armor: newOptions}},
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
      {/* Defense */}
      <NumericOption
        title={'Defense'}
        options={options}
        state={options.defense}
        passBack={(defense: number[] | 'any') =>
          passBack({...options, defense: defense})
        }
      />
      {/* Soak */}
      <NumericOption
        title={'Soak'}
        options={options}
        state={options.soak}
        passBack={(soak: number[] | 'any') =>
          passBack({...options, soak: soak})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options}
        state={options.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options}
        state={options.hardpoints}
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
        passBack={passBack}
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
      />
    </ScrollView>
  );
};
