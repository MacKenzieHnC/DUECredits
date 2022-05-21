import {Picker} from '@react-native-picker/picker';
import {Box, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '../Theme';

interface OptionProps {
  title: string;
  options: any;
  passBack: Function;
  defaultOption: any;
  canBeNone: boolean;
  childComponent: Element;
  startLimited: string;
  setAnySideEffect?: Function;
}

// Generic shared component between options
export const Option = ({
  title,
  options,
  passBack,
  defaultOption,
  canBeNone,
  childComponent,
  startLimited,
}: OptionProps) => {
  const [limitedState, setLimited] = useState(startLimited);

  // Stylize
  const theme = useTheme();

  return (
    <Box
      width="100%"
      p={5}
      rounded="md"
      backgroundColor={theme.colors.card}
      mb={2}
      borderWidth={1}
      borderColor={theme.colors.border}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.optionTitle}>
          <Text>{title}:</Text>
        </View>
        <Box
          flex={1}
          p={5}
          rounded="md"
          mb={2}
          borderWidth={1}
          borderColor={theme.colors.border}>
          <Picker
            style={styles.picker}
            selectedValue={limitedState}
            onValueChange={itemValue => {
              setLimited(itemValue);
              options.limit
                ? passBack({...options, limit: itemValue})
                : itemValue === 'limit'
                ? passBack(defaultOption)
                : passBack('any');
            }}>
            <Picker.Item label={'any'} value={'any'} />
            {canBeNone ? <Picker.Item label={'none'} value={'none'} /> : false}
            <Picker.Item label={'limit'} value={'limit'} />
          </Picker>
        </Box>
      </View>
      {limitedState === 'limit' ? <View>{childComponent}</View> : false}
    </Box>
  );
};

const styles = StyleSheet.create({
  options: {flexDirection: 'column'},
  headerTextContainer: {margin: 10},
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  optionTitle: {justifyContent: 'center', margin: 5},
  picker: {
    flex: 1,
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
