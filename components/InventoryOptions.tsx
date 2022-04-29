import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Generic shared component between options
const OptionComponent: React.FC<{
  title: String;
  limitOption: boolean;
  setLimitOption: Function;
  setOption: Function;
  defaultOption: any;
}> = ({title, limitOption, setLimitOption, setOption, defaultOption}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.optionTitle}>
        <Text>{title}:</Text>
      </View>
      <Picker
        style={styles.picker}
        selectedValue={limitOption}
        onValueChange={itemValue => {
          setLimitOption(itemValue);
          itemValue ? setOption(defaultOption) : setOption('any');
        }}>
        <Picker.Item label={'any'} value={false} />
        <Picker.Item label={'limit'} value={true} />
      </Picker>
    </View>
  );
};

// Specialized component for restriction
const LimitRestrictedComponent: React.FC<{
  restricted: any;
  setRestricted: Function;
}> = ({restricted, setRestricted}) => {
  return (
    <View style={styles.option}>
      <Picker
        style={styles.picker}
        selectedValue={restricted}
        onValueChange={itemValue => setRestricted(itemValue)}>
        <Picker.Item label={'Nonrestricted Only'} value={false} />
        <Picker.Item label={'Restricted Only'} value={true} />
      </Picker>
    </View>
  );
};

// Component for shared values among items (restricted, price, etc.)
const GeneralRulesComponent: React.FC<{
  generalRestricted: any;
  setGeneralRestricted: Function;
  defaultGeneralRestricted: any;
}> = ({generalRestricted, setGeneralRestricted, defaultGeneralRestricted}) => {
  const [limitGeneralRestricted, setLimitGeneralRestricted] = useState(false);
  return (
    <View>
      {/* General Restricted */}
      <View>
        <OptionComponent
          title="Restricted"
          limitOption={limitGeneralRestricted}
          setLimitOption={setLimitGeneralRestricted}
          setOption={setGeneralRestricted}
          defaultOption={defaultGeneralRestricted}
        />
        {limitGeneralRestricted ? (
          <LimitRestrictedComponent
            restricted={generalRestricted}
            setRestricted={setGeneralRestricted}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

// The main component.
// Don't let all the variables scare you. Look at models/InventoryRulesIndex.ts to see what they all mean.
export const InventoryOptions: React.FC<{}> = () => {
  // General options
  const [generalRestricted, setGeneralRestricted] = useState(
    'any' as boolean | 'any',
  );
  const [generalRestrictedDefault, setGeneralRestrictedDefault] =
    useState(false);
  const [generalPrice, setGeneralPrice] = useState('any' as 'any');
  const [generalRarity, setGeneralRarity] = useState('any' as 'any');
  const [generalIsUnique, setGeneralIsUnique] = useState('any' as 'any');
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Options</Text>
      </View>
      <GeneralRulesComponent
        generalRestricted={generalRestricted}
        setGeneralRestricted={setGeneralRestricted}
        defaultGeneralRestricted={generalRestrictedDefault}
      />
      <Text>{generalRestricted.toString()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContainer: {backgroundColor: 'indigo'},
  headerTextContainer: {margin: 10},
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  option: {flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1},
  optionTitle: {justifyContent: 'center', margin: 5},
  picker: {flex: 1, borderLeftWidth: 1, borderRightWidth: 1},
});
