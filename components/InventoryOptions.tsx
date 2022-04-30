import {Picker} from '@react-native-picker/picker';
import {HStack, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {generalRules, inventoryRules} from '../models/InventoryRulesIndex';

// Generic shared component between options
const OptionComponent: React.FC<{
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
    <View style={styles.optionsComponent}>
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

// Specialized component for boolean options (is restricted/unique)
const BooleanOption: React.FC<{
  title: string;
  options: any;
  state: boolean | 'any';
  setState: Function;
}> = ({title, options, state, setState}) => {
  const childComponent = (
    <Picker
      selectedValue={state}
      onValueChange={itemValue => setState(itemValue)}>
      <Picker.Item label={'Non-' + title + ' Only'} value={false} />
      <Picker.Item label={title + ' Only'} value={true} />
    </Picker>
  );
  return (
    <OptionComponent
      title={title}
      options={options}
      setOption={setState}
      defaultOption={false}
      anyOption={'any'}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};

// Specialized component for numeric options (price, rarity, etc.)
const NumericOption: React.FC<{
  title: string;
  options: any;
  state: number[] | 'any';
  setState: Function;
}> = ({title, options, state, setState}) => {
  const defaultOption = [0, 1000000000000];
  const childComponent = (
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
  );
  return (
    <OptionComponent
      title={title}
      options={options}
      setOption={setState}
      defaultOption={defaultOption}
      anyOption={'any'}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};

// Component for shared values among items (restricted, price, etc.)
const GeneralRulesComponent: React.FC<{
  title: string;
  options: inventoryRules;
  setOptions: Function;
}> = ({title, options, setOptions}) => {
  const childComponent = (
    <View>
      {/* Restricted */}
      <BooleanOption
        title={'Restricted'}
        options={options}
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
        options={options}
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
        options={options}
        state={options.general.rarity}
        setState={(rarity: number[] | 'any') =>
          setOptions({
            ...options,
            general: {...options.general, rarity: rarity},
          })
        }
      />
      {/* Restricted */}
      <BooleanOption
        title={'Unique'}
        options={options}
        state={options.general.is_unique}
        setState={(is_unique: boolean | 'any') =>
          setOptions({
            ...options,
            general: {...options.general, is_unique: is_unique},
          })
        }
      />
    </View>
  );
  return (
    <OptionComponent
      title={title}
      options={options}
      setOption={(general: generalRules) =>
        setOptions({...options, general: general})
      }
      defaultOption={defaultGeneralOptions}
      anyOption={anyOptions.general}
      canBeNone={false}
      childComponent={childComponent}
    />
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
const anyOptions = defaultOptions;

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
      <GeneralRulesComponent
        title={'General Rules'}
        options={options}
        setOptions={setOptions}
      />
      <Text>General Restricted: {options.general.restricted.toString()}</Text>
      <Text>General Price: {options.general.price.toString()}</Text>
      <Text>General Rarity: {options.general.rarity.toString()}</Text>
      <Text>General Unique: {options.general.is_unique.toString()}</Text>
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
