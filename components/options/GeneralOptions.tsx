import React from 'react';
import {View} from 'react-native';
import {GeneralOptions} from '../../models/InventoryOptionsIndex';
import {BooleanOption} from './BooleanOption';
import {NumericOption} from './NumericOption';
import {Option} from './Option';

interface GeneralOptionsProps {
  title: string;
  options: GeneralOptions;
  passBack: Function;
  defaultOptions: GeneralOptions;
}

// Component for shared values among items (restricted, price, etc.)
export const GeneralOptionsComponent = ({
  title,
  options,
  passBack,
  defaultOptions,
}: GeneralOptionsProps) => {
  const childComponent = (
    <View>
      {/* Restricted */}
      <BooleanOption
        title={'Restricted'}
        state={options.restricted}
        defaultOption={defaultOptions.restricted}
        passBack={(restricted: boolean | 'any') =>
          passBack({...options, restricted: restricted})
        }
      />
      {/* Price */}
      <NumericOption
        title={'Price'}
        state={options.price}
        defaultOption={defaultOptions.price}
        passBack={(price: number[] | 'any') =>
          passBack({...options, price: price})
        }
      />
      {/* Rarity */}
      <NumericOption
        title={'Rarity'}
        state={options.rarity}
        defaultOption={defaultOptions.rarity}
        passBack={(rarity: number[] | 'any') =>
          passBack({...options, rarity: rarity})
        }
      />
      {/* Restricted */}
      <BooleanOption
        title={'Unique'}
        state={options.is_unique}
        defaultOption={defaultOptions.is_unique}
        passBack={(is_unique: boolean | 'any') =>
          passBack({...options, is_unique: is_unique})
        }
      />
    </View>
  );
  return (
    <Option
      title={title}
      options={options}
      passBack={passBack}
      defaultOption={defaultOptions}
      canBeNone={false}
      childComponent={childComponent}
      startLimited={options.limit}
    />
  );
};
