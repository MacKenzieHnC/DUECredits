import {HStack, Spacer} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useTheme} from '../Theme';

interface TextProps {
  title: string;
  value: number;
  editMode: boolean;
  setValue: Function;
  allowNull?: boolean;
  alignContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export const NumericField = ({
  title,
  value,
  editMode,
  setValue,
  allowNull = false,
  alignContent = 'flex-start',
  justifyContent = 'flex-start',
}: TextProps) => {
  // Stylize
  const theme = useTheme();
  const [editValue, setEditValue] = useState(value);

  const toString = (num: number) => {
    var output = num.toLocaleString();
    if (output === 'NaN') {
      return '';
    } else {
      return output;
    }
  };

  const toNumber = (str: string) => {
    var output = 0;
    var isNegative = (str.match(/[-]/g) || []).length % 2 !== 0;
    !allowNull && (str === '' || str === '-')
      ? (output = 0)
      : (output = parseInt(str.replace(/[^0-9]/g, ''), 10));
    isNegative && (output *= -1);
    return output;
  };

  const onChange = (text: string) => {
    setEditValue(toNumber(text));
    setValue(toNumber(text));
  };

  return (
    <HStack flex={1} alignItems={alignContent} justifyContent={justifyContent}>
      {editMode ? (
        <TextInput
          style={styles.input}
          label={title}
          value={toString(editValue)}
          mode={'outlined'}
          dense={true}
          onChangeText={text => onChange(text)}
          theme={theme}
          outlineColor={theme.colors.border}
          keyboardType={'decimal-pad'}
        />
      ) : (
        <HStack>
          {title !== '' && <Text theme={theme}>{title + ': '}</Text>}
          <Text theme={theme} style={styles.info}>
            {toString(value)}
          </Text>
        </HStack>
      )}
    </HStack>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  label: {},
  info: {
    flexWrap: 'wrap',
  },
});
