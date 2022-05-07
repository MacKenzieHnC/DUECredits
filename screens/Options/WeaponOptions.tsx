import React, {useState} from 'react';
import {View} from 'react-native';
import {
  InventoryOptions,
  GeneralOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike, WeaponEffect} from '../../models/ItemIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {MultiSelectOption} from '../../components/options/MultiSelectOption';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectOptions} from '../../store/slices/shopSlice';
import {ScrollView} from 'native-base';

export const WeaponOptionsScreen = ({navigation}) => {
  // Initialize
  const defaultOptions = useAppSelector(selectOptions).inventoryOptions;
  const [options, setOptions] = useState<InventoryOptions['weapons']>(
    defaultOptions.weapons,
  );
  const {data: dbState, isLoading} = useGetDBStateQuery();
  if (isLoading || !dbState || !options) {
    return <LoadingScreen text="Loading shop" />;
  }

  // Function to alert shop of changes
  const passBack = (newOptions: InventoryOptions['weapons']) => {
    setOptions(newOptions);
    navigation.navigate({
      name: 'Options',
      params: {newOptions: {...defaultOptions, weapons: newOptions}},
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
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        options={options.categories}
        state={dbState.weapons.categories}
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.weapons.categories}
        features={['name']}
      />
      {/* Skill */}
      <MultiSelectOption
        title={'Skills'}
        options={options.skills}
        state={dbState.weapons.skills}
        passBack={(skills: CategoryLike[] | 'any') =>
          passBack({...options, skills: skills})
        }
        items={dbState.weapons.skills}
        features={['name']}
      />
      {/* Damage */}
      <NumericOption
        title={'Damage'}
        options={options.damage}
        state={defaultOptions.damage}
        passBack={(damage: number[] | 'any') =>
          passBack({...options, damage: damage})
        }
      />
      {/* Crit */}
      <NumericOption
        title={'Crit'}
        options={options.crit}
        state={defaultOptions.crit}
        passBack={(crit: number[] | 'any') =>
          passBack({...options, crit: crit})
        }
      />
      {/* Range */}
      <MultiSelectOption
        title={'Ranges'}
        options={options.ranges}
        state={dbState.weapons.ranges}
        passBack={(ranges: CategoryLike[] | 'any') =>
          passBack({...options, ranges: ranges})
        }
        items={dbState.weapons.ranges}
        features={['name']}
      />
      {/* Effect */}
      <MultiSelectOption
        title={'Effects'}
        options={options.effects}
        state={dbState.weapons.effects}
        passBack={(effects: WeaponEffect[] | 'any') =>
          passBack({...options, effects: effects})
        }
        items={dbState.weapons.effects}
        features={['name']}
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options.encumbrance}
        state={defaultOptions.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options.hardpoints}
        state={defaultOptions.hardpoints}
        passBack={(hardpoints: number[] | 'any') =>
          passBack({...options, hardpoints: hardpoints})
        }
      />
    </View>
  );
  return (
    <ScrollView>
      <Option
        title={'Weapons'}
        options={options}
        passBack={passBack}
        defaultOption={defaultOptions}
        canBeNone={true}
        childComponent={childComponent}
      />
    </ScrollView>
  );
};
