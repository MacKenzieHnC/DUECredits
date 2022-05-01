import {HStack, Text, View} from 'native-base';
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
      <View width="25%">
        <Text>Min:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder={'MIN'}
          onChangeText={itemValue =>
            setState([parseInt(itemValue, 10), state[1]])
          }
        />
      </View>
      <View width="25%">
        <Text>Max:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder={'MAX'}
          onChangeText={itemValue =>
            setState([state[0], parseInt(itemValue, 10)])
          }
        />
      </View>
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
