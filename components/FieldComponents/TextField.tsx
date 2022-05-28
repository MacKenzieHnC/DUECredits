import {HStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useTheme} from '../Theme';

interface TextProps {
  title: string;
  value: string;
  editMode: boolean;
  setValue: Function;
}

export const TextField = ({title, value, editMode, setValue}: TextProps) => {
  // Stylize
  const theme = useTheme();
  const [editValue, setEditValue] = useState(value);

  const onChange = (text: string) => {
    setEditValue(text);
    setValue(text);
  };

  return (
    <HStack flex={1}>
      {editMode ? (
        <TextInput
          style={styles.input}
          label={title}
          value={editValue}
          mode={'outlined'}
          dense={true}
          onChangeText={text => onChange(text)}
          theme={theme}
          outlineColor={theme.colors.border}
        />
      ) : (
        <HStack>
          {title !== '' && <Text theme={theme}>{title + ': '}</Text>}
          <Text theme={theme} style={styles.info}>
            {value}
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
    flex: 1,
    flexWrap: 'wrap',
  },
});
