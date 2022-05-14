import {Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {TextInput} from 'react-native';
import {Option} from './Option';

interface NumericOptionProps {
  title: string;
  state: number[] | 'any';
  defaultOption: number[] | 'any';
  passBack: Function;
}

// Specialized component for numeric options (price, rarity, etc.)
export const NumericOption = ({
  title,
  state,
  defaultOption,
  passBack: passBack,
}: NumericOptionProps) => {
  const toString = (num: number) => {
    var output = num.toLocaleString();
    if (output === 'NaN') {
      return num;
    } else {
      return output;
    }
  };

  const toNumber = (str: string) => {
    var output = 0;
    var isNegative = (str.match(/[-]/g) || []).length % 2 !== 0;
    str === '' || str === '-'
      ? (output = 0)
      : (output = parseInt(str.replace(/[^0-9]/g, ''), 10));
    isNegative ? (output *= -1) : null;
    return output;
  };
  const childComponent = (
    <VStack>
      <HStack style={{flexDirection: 'row'}}>
        <Box
          style={{flex: 1}}
          width="50%"
          minHeight={75}
          rounded="md"
          borderWidth={1}
          borderColor="primary.800">
          <TextInput
            style={{flex: 1}}
            keyboardType="numeric"
            allowFontScaling={true}
            selectTextOnFocus={true}
            multiline={true}
            value={toString(state[0] as number)}
            onChangeText={itemValue =>
              passBack([toNumber(itemValue), state[1]])
            }
            textAlign={'center'}
          />
        </Box>
        <Box
          style={{flex: 1}}
          width="50%"
          minHeight={75}
          rounded="md"
          borderWidth={1}
          borderColor="primary.800">
          <TextInput
            style={{flex: 1}}
            keyboardType="numeric"
            allowFontScaling={true}
            selectTextOnFocus={true}
            multiline={true}
            value={toString(state[1] as number)}
            onChangeText={itemValue =>
              passBack([state[0], toNumber(itemValue)])
            }
            textAlign={'center'}
          />
        </Box>
      </HStack>
      {state[1] < state[0] ? (
        <Text>
          WARNING: Maximum less than minimum! This item type won't show up!
        </Text>
      ) : null}
    </VStack>
  );
  return (
    <Option
      title={title}
      options={state}
      passBack={passBack}
      defaultOption={
        defaultOption === 'any' ? [0, 1000000000000] : defaultOption
      }
      canBeNone={false}
      childComponent={childComponent}
      startLimited={state === 'any' ? 'any' : 'limit'}
    />
  );
};
