import {Box, HStack} from 'native-base';
import React from 'react';
import {TextInput} from 'react-native';
import {Option} from './Option';

// Specialized component for numeric options (price, rarity, etc.)
export const NumericOption: React.FC<{
  title: string;
  options: any;
  state: number[] | 'any';
  setState: Function;
}> = ({title, options, state, setState}) => {
  const defaultOption = [0, 1000000000000];
  const childComponent = (
    <HStack style={{flexDirection: 'row'}}>
      <Box
        width="50%"
        p={5}
        rounded="md"
        mb={2}
        borderWidth={1}
        borderColor="primary.800">
        <TextInput
          keyboardType="numeric"
          placeholder={'MIN'}
          onChangeText={itemValue =>
            setState([parseInt(itemValue, 10), state[1]])
          }
          textAlign={'center'}
        />
      </Box>
      <Box
        width="50%"
        p={5}
        rounded="md"
        mb={2}
        borderWidth={1}
        borderColor="primary.800">
        <TextInput
          keyboardType="numeric"
          placeholder={'MAX'}
          onChangeText={itemValue =>
            setState([state[0], parseInt(itemValue, 10)])
          }
          textAlign={'center'}
        />
      </Box>
    </HStack>
  );
  return (
    <Option
      title={title}
      options={options}
      setOption={setState}
      defaultOption={defaultOption}
      anyOption={'any'}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};
