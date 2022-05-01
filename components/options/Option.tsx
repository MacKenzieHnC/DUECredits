import {Picker} from '@react-native-picker/picker';
import {Box, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';

// Generic shared component between options
export const Option: React.FC<{
  title: string;
  options: any;
  setOption: Function;
  defaultOption: any;
  anyOption: any;
  canBeNone: boolean;
  childComponent: Element;
}> = ({
  title,
  options,
  setOption,
  defaultOption,
  anyOption,
  canBeNone,
  childComponent,
}) => {
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
                    ? setOption({...options, limit: 'any'})
                    : setOption(anyOption);
                  break;
                case 'none':
                  setOption({...options, limit: 'none'});
                  break;
                case 'limit':
                  canBeNone
                    ? setOption({...options, limit: 'limit'})
                    : setOption(defaultOption);
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
