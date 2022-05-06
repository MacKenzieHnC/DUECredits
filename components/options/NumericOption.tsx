import {Box, HStack} from 'native-base';
import React from 'react';
import {TextInput} from 'react-native';
import {Option} from './Option';

interface NumericOptionProps {
  title: string;
  options: any;
  state: number[] | 'any';
  passBack: Function;
}

// Specialized component for numeric options (price, rarity, etc.)
export const NumericOption = ({
  title,
  options,
  state,
  passBack: passBack,
}: NumericOptionProps) => {
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
            passBack([parseInt(itemValue, 10), state[1]])
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
            passBack([state[0], parseInt(itemValue, 10)])
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
      passBack={passBack}
      defaultOption={defaultOption}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};
