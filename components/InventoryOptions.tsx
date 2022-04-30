import {Picker} from '@react-native-picker/picker';
import {HStack, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {generalRules, inventoryRules} from '../models/InventoryRulesIndex';

// Generic shared component between options
const OptionComponent: React.FC<{
  title: string;
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

// Specialized component for boolean options (is restricted/unique)
const BooleanOption: React.FC<{
  title: string;
  state: boolean | 'any';
  setState: Function;
}> = ({title, state, setState}) => {
  const [isLimited, setLimited] = useState(false);
  return (
    <View style={styles.optionsComponent}>
      <OptionComponent
        title={title}
        limitOption={isLimited}
        setLimitOption={setLimited}
        setOption={setState}
        defaultOption={false}
      />
      <View>
        {isLimited ? (
          <Picker
            selectedValue={state}
            onValueChange={itemValue => setState(itemValue)}>
            <Picker.Item label={'Not ' + title + ' Only'} value={false} />
            <Picker.Item label={title + ' Only'} value={true} />
          </Picker>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

// Specialized component for numeric options (price, rarity, etc.)
const NumericOption: React.FC<{
  title: string;
  state: number[] | 'any';
  setState: Function;
}> = ({title, state, setState}) => {
  const [isLimited, setLimited] = useState(false);
  const defaultOption = [0, 1000000000000];
  return (
    <View style={styles.optionsComponent}>
      <OptionComponent
        title={title}
        limitOption={isLimited}
        setLimitOption={setLimited}
        setOption={setState}
        defaultOption={defaultOption}
      />
      {isLimited ? (
        <HStack style={{flexDirection: 'row'}}>
          <View width="25%">
            <Text>Min:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder={'MIN'}
              onChangeText={itemValue =>
                setState([parseInt(itemValue, 10), state[1]])
              }
            />
          </View>
          <View width="25%">
            <Text>Max:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder={'MAX'}
              onChangeText={itemValue =>
                setState([state[0], parseInt(itemValue, 10)])
              }
            />
          </View>
        </HStack>
      ) : (
        <View />
      )}
    </View>
  );
};

// Component for shared values among items (restricted, price, etc.)
const GeneralRulesComponent: React.FC<{
  options: inventoryRules;
  setOptions: Function;
}> = ({options, setOptions}) => {
  return (
    <View>
      {/* Restricted */}
      <View>
        <BooleanOption
          title={'Restricted'}
          state={options.general.restricted}
          setState={(restricted: boolean | 'any') =>
            setOptions({
              ...options,
              general: {...options.general, restricted: restricted},
            })
          }
        />
        {/* Price */}
        <NumericOption
          title={'Price'}
          state={options.general.price}
          setState={(price: number[] | 'any') =>
            setOptions({
              ...options,
              general: {...options.general, price: price},
            })
          }
        />
        {/* Rarity */}
        <NumericOption
          title={'Rarity'}
          state={options.general.rarity}
          setState={(rarity: number[] | 'any') =>
            setOptions({
              ...options,
              general: {...options.general, rarity: rarity},
            })
          }
        />
      </View>
    </View>
  );
};

// TODO: Load these in from database
const defaultGeneralOptions: generalRules = {
  restricted: 'any',
  price: 'any',
  rarity: 'any',
  is_unique: 'any',
};
const defaultOptions: inventoryRules = {
  general: defaultGeneralOptions,
  armor: {
    general: defaultGeneralOptions,
    defense: 'any',
    soak: 'any',
    encumbrance: 'any',
    hardpoints: 'any',
  },
  weapons: {
    general: defaultGeneralOptions,
    category: 'any',
    skill: 'any',
    damage: 'any',
    crit: 'any',
    range: 'any',
    encumbrance: 'any',
    hardpoints: 'any',
  },
};

// The main component.
// Don't let all the variables scare you. Look at models/InventoryRulesIndex.ts to see what they all mean.
export const InventoryOptions: React.FC<{}> = () => {
  // General options
  const [options, setOptions] = useState<inventoryRules>(defaultOptions);
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.headerTextContainer}>
        <Text>Options</Text>
      </View>
      <GeneralRulesComponent options={options} setOptions={setOptions} />
      <Text>{options.general.price.toString()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContainer: {backgroundColor: 'indigo'},
  optionsComponent: {flexDirection: 'column'},
  headerTextContainer: {margin: 10},
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  option: {flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1},
  optionTitle: {justifyContent: 'center', margin: 5},
  picker: {
    flex: 1,
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  test: {borderWidth: 3},
});
