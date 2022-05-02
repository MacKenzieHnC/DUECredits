import {View} from 'native-base';
import React from 'react';
import {ListItem} from '../../models/ItemIndex';
import {Option} from './Option';
import MultiPicker from '../MultiPicker/MultiPicker';
import {SafeAreaView} from 'react-native';

// Specialized component for boolean options (is restricted/unique)
export const MultiSelectOption: React.FC<{
  title: string;
  options: any;
  state: ListItem[] | 'any';
  setState: Function;
  items: ListItem[];
}> = ({title, options, state, setState, items}) => {
  const childComponent = (
    <View borderColor="primary.800">
      <MultiPicker
        items={items}
        placeholder={title}
        icon={undefined}
        selectedItems={state === 'any' ? items : state}
        onChangeItems={setState}
      />
    </View>
  );
  return (
    <SafeAreaView>
      <Option
        title={title}
        options={options}
        setOption={setState}
        defaultOption={items}
        anyOption={'any'}
        canBeNone={false}
        childComponent={childComponent}
      />
    </SafeAreaView>
  );
};
