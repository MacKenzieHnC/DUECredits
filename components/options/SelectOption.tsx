import {Picker} from '@react-native-picker/picker';
import {Box, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

interface SelectOptionProps {
  title: string;
  state: number;
  passBack: Function;
  items: any[];
  features: string[];
  featureNames?: string[];
}

// Specialized component for boolean options (is restricted/unique)
export const SelectOption = ({
  title,
  state,
  passBack,
  items,
  features,
  featureNames,
}: SelectOptionProps) => {
  const values: any[] = [];
  for (let i = 0; i < items.length; i++) {
    var label = '';
    for (let j = 0; j < features.length; j++) {
      label +=
        (featureNames
          ? featureNames[j] !== ''
            ? featureNames[j] + ': '
            : ''
          : '') + items[i][features[j]];
      if (j < features.length - 1) {
        label += '\n';
      }
    }
    values.push!(<Picker.Item label={label} value={items[i].id} />);
  }
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
          <Text color="white">{title}:</Text>
        </View>
        <Box
          flex={1}
          p={5}
          rounded="md"
          mb={2}
          borderWidth={1}
          borderColor="primary.800">
          <Picker
            selectedValue={state}
            onValueChange={itemValue => passBack(itemValue)}
            numberOfLines={50}>
            {values}
          </Picker>
        </Box>
      </View>
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
