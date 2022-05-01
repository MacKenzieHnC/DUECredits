import {Picker} from '@react-native-picker/picker';
import {Box} from 'native-base';
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
    <Box
      width="100%"
      p={5}
      rounded="md"
      mb={2}
      borderWidth={1}
      borderColor="primary.800">
      <Picker
        selectedValue={state}
        onValueChange={itemValue => setState(itemValue)}>
        <Picker.Item label={'Non-' + title + ' Only'} value={false} />
        <Picker.Item label={title + ' Only'} value={true} />
      </Picker>
    </Box>
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
