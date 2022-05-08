import {View} from 'native-base';
import React from 'react';
import {
  AdditionalRule,
  CategoryLike,
  WeaponEffect,
} from '../../models/ItemIndex';
import {Option} from './Option';
import {SafeAreaView} from 'react-native';
import MultiPicker from './MultiPicker/MultiPicker';

interface MultiSelectOptionProps {
  title: string;
  state: CategoryLike[] | WeaponEffect[] | AdditionalRule[] | 'any';
  defaultOption: CategoryLike[] | WeaponEffect[] | AdditionalRule[] | 'any';
  passBack: Function;
  items: CategoryLike[] | WeaponEffect[] | AdditionalRule[];
  features: string[];
}

// Specialized component for boolean options (is restricted/unique)
export const MultiSelectOption = ({
  title,
  state,
  defaultOption,
  passBack: passBack,
  items,
  features,
}: MultiSelectOptionProps) => {
  const childComponent = (
    <View borderColor="primary.800">
      <MultiPicker
        items={items}
        placeholder={title}
        icon={undefined}
        selectedItems={state === 'any' ? items : state}
        onChangeItems={passBack}
        features={features}
      />
    </View>
  );
  return (
    <SafeAreaView>
      <Option
        title={title}
        options={state}
        passBack={passBack}
        defaultOption={defaultOption === 'any' ? items : defaultOption}
        canBeNone={false}
        childComponent={childComponent}
        startLimited={state === 'any' ? 'any' : 'limit'}
      />
    </SafeAreaView>
  );
};
