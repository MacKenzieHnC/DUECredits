import React from 'react';
import {View} from 'react-native';
import {
  inventoryOptions,
  generalOptions,
} from '../../models/InventoryOptionsIndex';
import {GeneralOptions} from './GeneralOptions';
import {NumericOption} from './NumericOption';
import {Option} from './Option';

export const ArmorOptions: React.FC<{
  options: inventoryOptions['armor'];
  setOptions: Function;
  defaultOptions: inventoryOptions;
  anyOptions: inventoryOptions;
}> = ({options, setOptions, defaultOptions, anyOptions}) => {
  const childComponent = (
    <View>
      <GeneralOptions
        title={'General Options'}
        options={options.general}
        setOptions={(general: generalOptions) =>
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
