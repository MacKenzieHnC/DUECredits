import React from 'react';
import {View} from 'react-native';
import {
  inventoryOptions,
  generalOptions,
} from '../../models/InventoryOptionsIndex';
import {DBWeaponsState, ListItem} from '../../models/ItemIndex';
import {GeneralOptions} from './GeneralOptions';
import {MultiSelectOption} from './MultiSelectOption';
import {Option} from './Option';

export const WeaponOptions: React.FC<{
  options: inventoryOptions['weapons'];
  setOptions: Function;
  defaultOptions: inventoryOptions;
  anyOptions: inventoryOptions;
  dbState: DBWeaponsState;
}> = ({options, setOptions, defaultOptions, anyOptions, dbState}) => {
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
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        options={options.categories}
        state={dbState.categories}
        setState={(categories: ListItem[] | 'any') =>
          setOptions({...options, categories: categories})
        }
        items={dbState.categories}
      />
    </View>
  );
  return (
    <Option
      title={'Weapons'}
      options={options}
      setOption={setOptions}
      defaultOption={defaultOptions.weapons}
      anyOption={anyOptions.weapons}
      canBeNone={true}
      childComponent={childComponent}
    />
  );
};
