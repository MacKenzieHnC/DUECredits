import React from 'react';
import {View} from 'react-native';
import {
  inventoryOptions,
  generalOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike, DBState} from '../../models/ItemIndex';
import {GeneralOptions} from './GeneralOptions';
import {MultiSelectOption} from './MultiSelectOption';
import {NumericOption} from './NumericOption';
import {Option} from './Option';

export const WeaponOptions: React.FC<{
  options: inventoryOptions['weapons'];
  setOptions: Function;
  defaultOptions: inventoryOptions;
  anyOptions: inventoryOptions;
  dbState: DBState['weapons'];
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
        setState={(categories: CategoryLike[] | 'any') =>
          setOptions({...options, categories: categories})
        }
        items={dbState.categories}
      />
      {/* Skill */}
      <MultiSelectOption
        title={'Skills'}
        options={options.skills}
        state={dbState.skills}
        setState={(skills: CategoryLike[] | 'any') =>
          setOptions({...options, skills: skills})
        }
        items={dbState.skills}
      />
      {/* Damage */}
      <NumericOption
        title={'Damage'}
        options={options.damage}
        state={defaultOptions.weapons.damage}
        setState={(damage: number[] | 'any') =>
          setOptions({...options, damage: damage})
        }
      />
      {/* Crit */}
      <NumericOption
        title={'Crit'}
        options={options.crit}
        state={defaultOptions.weapons.crit}
        setState={(crit: number[] | 'any') =>
          setOptions({...options, crit: crit})
        }
      />
      {/* Range */}
      <MultiSelectOption
        title={'Ranges'}
        options={options.ranges}
        state={dbState.ranges}
        setState={(ranges: CategoryLike[] | 'any') =>
          setOptions({...options, ranges: ranges})
        }
        items={dbState.ranges}
      />
      {/* Effect */}
      <MultiSelectOption
        title={'Effects'}
        options={options.effects}
        state={dbState.effects}
        setState={(effects: CategoryLike[] | 'any') =>
          setOptions({...options, effects: effects})
        }
        items={dbState.effects}
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options.encumbrance}
        state={defaultOptions.weapons.encumbrance}
        setState={(encumbrance: number[] | 'any') =>
          setOptions({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options.hardpoints}
        state={defaultOptions.weapons.hardpoints}
        setState={(hardpoints: number[] | 'any') =>
          setOptions({...options, hardpoints: hardpoints})
        }
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
