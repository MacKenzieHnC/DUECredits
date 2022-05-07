import {View} from 'native-base';
import React from 'react';
import {
  AdditionalRule,
  CategoryLike,
  WeaponEffect,
} from '../../models/ItemIndex';
import {Option} from './Option';
import MultiPicker from '../MultiPicker/MultiPicker';
import {SafeAreaView} from 'react-native';

interface MultiSelectOptionProps {
  title: string;
  options: any;
  state: CategoryLike[] | WeaponEffect[] | AdditionalRule[] | 'any';
  passBack: Function;
  items: CategoryLike[] | WeaponEffect[] | AdditionalRule[];
}

// Specialized component for boolean options (is restricted/unique)
export const MultiSelectOption = ({
  title,
  options,
  state,
  passBack: passBack,
  items,
}: MultiSelectOptionProps) => {
  const childComponent = (
    <View borderColor="primary.800">
      <MultiPicker
        items={items}
        placeholder={title}
        icon={undefined}
        selectedItems={state === 'any' ? items : state}
        onChangeItems={passBack}
      />
    </View>
  );
  return (
    <SafeAreaView>
      <Option
        title={title}
        options={options}
        passBack={passBack}
        defaultOption={items}
        canBeNone={false}
        childComponent={childComponent}
      />
    </SafeAreaView>
  );
};
