import {Picker} from '@react-native-picker/picker';
import {Box} from 'native-base';
import React from 'react';
import {useTheme} from '../Theme';
import {Option} from './Option';

interface BooleanOptionProps {
  title: string;
  state: boolean | 'any';
  defaultOption: boolean | 'any';
  passBack: Function;
}

// Specialized component for boolean options (is restricted/unique)
export const BooleanOption = ({
  title,
  state,
  defaultOption,
  passBack,
}: BooleanOptionProps) => {
  // Stylize
  const theme = useTheme();

  const childComponent = (
    <Box
      width="100%"
      p={5}
      rounded="md"
      mb={2}
      borderWidth={1}
      borderColor={theme.colors.border}>
      <Picker
        selectedValue={state}
        onValueChange={itemValue => passBack(itemValue)}>
        <Picker.Item label={'Non-' + title + ' Only'} value={false} />
        <Picker.Item label={title + ' Only'} value={true} />
      </Picker>
    </Box>
  );
  return (
    <Option
      title={title}
      options={state}
      passBack={passBack}
      defaultOption={defaultOption === 'any' ? false : defaultOption}
      canBeNone={false}
      childComponent={childComponent}
      startLimited={state === 'any' ? 'any' : 'limit'}
    />
  );
};
