import React from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
} from '../../models/InventoryOptionsIndex';
import {GeneralOptionsComponent} from './GeneralOptions';
import {NumericOption} from './NumericOption';
import {Option} from './Option';

export const ArmorOptionsComponent: React.FC<{
  options: InventoryOptions['armor'];
  setOptions: Function;
  defaultOptions: InventoryOptions;
  anyOptions: InventoryOptions;
}> = ({options, setOptions, defaultOptions, anyOptions}) => {
  const childComponent = (
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
      {/* Defense */}
      <NumericOption
        title={'Defense'}
        options={options}
        state={options.defense}
        setState={(defense: number[] | 'any') =>
          setOptions({...options, defense: defense})
        }
      />
      {/* Soak */}
      <NumericOption
        title={'Soak'}
        options={options}
        state={options.soak}
        setState={(soak: number[] | 'any') =>
          setOptions({...options, soak: soak})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options}
        state={options.encumbrance}
        setState={(encumbrance: number[] | 'any') =>
          setOptions({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options}
        state={options.hardpoints}
        setState={(hardpoints: number[] | 'any') =>
          setOptions({...options, hardpoints: hardpoints})
        }
      />
    </View>
  );
  return (
    <Option
      title={'Armor'}
      options={options}
      setOption={setOptions}
      defaultOption={defaultOptions.armor}
      anyOption={anyOptions.armor}
      canBeNone={true}
      childComponent={childComponent}
    />
  );
};
