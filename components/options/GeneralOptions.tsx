import React from 'react';
import {View} from 'react-native';
import {generalOptions} from '../../models/InventoryOptionsIndex';
import {BooleanOption} from './BooleanOption';
import {NumericOption} from './NumericOption';
import {Option} from './Option';

// Component for shared values among items (restricted, price, etc.)
export const GeneralOptions: React.FC<{
  title: string;
  options: generalOptions;
  setOptions: Function;
  defaultOptions: generalOptions;
  anyOptions: generalOptions;
}> = ({title, options, setOptions, defaultOptions, anyOptions}) => {
  const childComponent = (
    <View>
      {/* Restricted */}
      <BooleanOption
        title={'Restricted'}
        options={options}
        state={options.restricted}
        setState={(restricted: boolean | 'any') =>
          setOptions({...options, restricted: restricted})
        }
      />
      {/* Price */}
      <NumericOption
        title={'Price'}
        options={options}
        state={options.price}
        setState={(price: number[] | 'any') =>
          setOptions({...options, price: price})
        }
      />
      {/* Rarity */}
      <NumericOption
        title={'Rarity'}
        options={options}
        state={options.rarity}
        setState={(rarity: number[] | 'any') =>
          setOptions({...options, rarity: rarity})
        }
      />
      {/* Restricted */}
      <BooleanOption
        title={'Unique'}
        options={options}
        state={options.is_unique}
        setState={(is_unique: boolean | 'any') =>
          setOptions({...options, is_unique: is_unique})
        }
      />
    </View>
  );
  return (
    <Option
      title={title}
      options={options}
      setOption={setOptions}
      defaultOption={defaultOptions}
      anyOption={anyOptions}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};
