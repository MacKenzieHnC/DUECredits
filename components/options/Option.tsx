import {Picker} from '@react-native-picker/picker';
import {View} from 'native-base';
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
    <View style={styles.options}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.optionTitle}>
          <Text>{title}:</Text>
        </View>
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
      </View>
      {limitedState === 'limit' ? <View>{childComponent}</View> : false}
    </View>
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
