import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Option} from './Option';

// Specialized component for boolean options (is restricted/unique)
export const BooleanOption: React.FC<{
  title: string;
  options: any;
  state: boolean | 'any';
  setState: Function;
}> = ({title, options, state, setState}) => {
  const childComponent = (
    <Picker
      selectedValue={state}
      onValueChange={itemValue => setState(itemValue)}>
      <Picker.Item label={'Non-' + title + ' Only'} value={false} />
      <Picker.Item label={title + ' Only'} value={true} />
    </Picker>
  );
  return (
    <Option
      title={title}
      options={options}
      setOption={setState}
      defaultOption={false}
      anyOption={'any'}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};
