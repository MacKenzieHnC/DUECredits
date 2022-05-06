import {Picker} from '@react-native-picker/picker';
import {Box, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';

interface OptionProps {
  title: string;
  options: any;
  passBack: Function;
  defaultOption: any;
  canBeNone: boolean;
  childComponent: Element;
}

// Generic shared component between options
export const Option = ({
  title,
  options,
  passBack,
  defaultOption,
  canBeNone,
  childComponent,
}: OptionProps) => {
  const [limitedState, setLimited] = useState('any');
  return (
    <Box
      width="100%"
      p={5}
      rounded="md"
      backgroundColor="primary.900"
      mb={2}
      borderWidth={1}
      borderColor="primary.800">
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
          borderColor="primary.800">
          <Picker
            style={styles.picker}
            selectedValue={limitedState}
            onValueChange={itemValue => {
              setLimited(itemValue);
              switch (itemValue) {
                case 'any':
                  canBeNone
                    ? passBack({...options, limit: 'any'})
                    : passBack('any');
                  break;
                case 'none':
                  passBack({...options, limit: 'none'});
                  break;
                case 'limit':
                  canBeNone
                    ? passBack({...options, limit: 'limit'})
                    : passBack(defaultOption);
                  break;
              }
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
