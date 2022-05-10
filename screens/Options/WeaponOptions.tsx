import React, {useState} from 'react';
import {View} from 'react-native';
import {
  GeneralOptions,
  InventoryOptions,
  Shop,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {CategoryLike, WeaponEffect} from '../../models/ItemIndex';
import {GeneralOptionsComponent} from '../../components/options/GeneralOptions';
import {MultiSelectOption} from '../../components/options/MultiSelectOption';
import {NumericOption} from '../../components/options/NumericOption';
import {Option} from '../../components/options/Option';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {selectShop} from '../../store/slices/databaseSlice';
import {ScrollView} from 'native-base';

export const WeaponOptionsScreen = ({navigation}: any) => {
  // Initialize
  const defaultOptions: ShopOptions = (
    useAppSelector(selectShop(useAppSelector(selectCurrentShop))) as Shop
  ).options;
  const [options, setOptions] = useState<InventoryOptions['weapons']>(
    defaultOptions.inventoryOptions.weapons,
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
      params: {
        key: 'weapons',
        isInventory: true,
        options: newOptions,
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
        defaultOptions={defaultOptions.inventoryOptions.weapons.general}
      />
      {/* Category */}
      <MultiSelectOption
        title={'Categories'}
        state={options.categories}
        defaultOption={defaultOptions.inventoryOptions.weapons.categories}
        passBack={(categories: CategoryLike[] | 'any') =>
          passBack({...options, categories: categories})
        }
        items={dbState.weapons.categories}
        features={['name']}
      />
      {/* Skill */}
      <MultiSelectOption
        title={'Skills'}
        state={options.skills}
        defaultOption={defaultOptions.inventoryOptions.weapons.skills}
        passBack={(skills: CategoryLike[] | 'any') =>
          passBack({...options, skills: skills})
        }
        items={dbState.weapons.skills}
        features={['name']}
      />
      {/* Damage */}
      <NumericOption
        title={'Damage'}
        state={options.damage}
        defaultOption={defaultOptions.inventoryOptions.weapons.damage}
        passBack={(damage: number[] | 'any') =>
          passBack({...options, damage: damage})
        }
      />
      {/* Crit */}
      <NumericOption
        title={'Crit'}
        state={options.crit}
        defaultOption={defaultOptions.inventoryOptions.weapons.crit}
        passBack={(crit: number[] | 'any') =>
          passBack({...options, crit: crit})
        }
      />
      {/* Range */}
      <MultiSelectOption
        title={'Ranges'}
        state={options.ranges}
        defaultOption={defaultOptions.inventoryOptions.weapons.ranges}
        passBack={(ranges: CategoryLike[] | 'any') =>
          passBack({...options, ranges: ranges})
        }
        items={dbState.weapons.ranges}
        features={['name']}
      />
      {/* Effect */}
      <MultiSelectOption
        title={'Effects'}
        state={options.effects}
        defaultOption={defaultOptions.inventoryOptions.weapons.effects}
        passBack={(effects: WeaponEffect[] | 'any') =>
          passBack({...options, effects: effects})
        }
        items={dbState.weapons.effects}
        features={['name']}
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        state={options.encumbrance}
        defaultOption={defaultOptions.inventoryOptions.weapons.encumbrance}
        passBack={(encumbrance: number[] | 'any') =>
          passBack({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        state={options.hardpoints}
        defaultOption={defaultOptions.inventoryOptions.weapons.hardpoints}
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
        startLimited={options.limit}
      />
    </ScrollView>
  );
};
