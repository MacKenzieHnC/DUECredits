import {Picker} from '@react-native-picker/picker';
import {HStack, ScrollView, Spacer, Text, View} from 'native-base';
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
  options: generalRules;
  setOptions: Function;
}> = ({title, options, setOptions}) => {
  const childComponent = (
    <View>
      {/* Restricted */}
      <BooleanOption
        title={'Restricted'}
        options={options}
        state={options.restricted}
        setState={(restricted: boolean | 'any') =>
          setOptions({...options, restricted: restricted})
        }
      />
      {/* Price */}
      <NumericOption
        title={'Price'}
        options={options}
        state={options.price}
        setState={(price: number[] | 'any') =>
          setOptions({...options, price: price})
        }
      />
      {/* Rarity */}
      <NumericOption
        title={'Rarity'}
        options={options}
        state={options.rarity}
        setState={(rarity: number[] | 'any') =>
          setOptions({
            ...options,
            general: {...options, rarity: rarity},
          })
        }
      />
      {/* Restricted */}
      <BooleanOption
        title={'Unique'}
        options={options}
        state={options.is_unique}
        setState={(is_unique: boolean | 'any') =>
          setOptions({...options, is_unique: is_unique})
        }
      />
    </View>
  );
  return (
    <OptionComponent
      title={title}
      options={options}
      setOption={setOptions}
      defaultOption={defaultGeneralOptions}
      anyOption={anyOptions.general}
      canBeNone={false}
      childComponent={childComponent}
    />
  );
};

const ArmorRulesComponent: React.FC<{
  options: inventoryRules['armor'];
  setOptions: Function;
}> = ({options, setOptions}) => {
  const childComponent = (
    <View>
      <GeneralRulesComponent
        title={'General Rules'}
        options={options.general}
        setOptions={(general: generalRules) =>
          setOptions({...options, general: general})
        }
      />
      {/* Defense */}
      <NumericOption
        title={'Defense'}
        options={options}
        state={options.defense}
        setState={(defense: number[] | 'any') =>
          setOptions({...options, defense: defense})
        }
      />
      {/* Soak */}
      <NumericOption
        title={'Soak'}
        options={options}
        state={options.soak}
        setState={(soak: number[] | 'any') =>
          setOptions({...options, soak: soak})
        }
      />
      {/* Encumbrance */}
      <NumericOption
        title={'Encumbrance'}
        options={options}
        state={options.encumbrance}
        setState={(encumbrance: number[] | 'any') =>
          setOptions({...options, encumbrance: encumbrance})
        }
      />
      {/* Hardpoints */}
      <NumericOption
        title={'Hardpoints'}
        options={options}
        state={options.hardpoints}
        setState={(hardpoints: number[] | 'any') =>
          setOptions({...options, hardpoints: hardpoints})
        }
      />
    </View>
  );
  return (
    <OptionComponent
      title={'Armor'}
      options={options}
      setOption={setOptions}
      defaultOption={defaultOptions.armor}
      anyOption={anyOptions.armor}
      canBeNone={true}
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
    limit: 'any',
    general: defaultGeneralOptions,
    defense: 'any',
    soak: 'any',
    encumbrance: 'any',
    hardpoints: 'any',
  },
  weapons: {
    limit: 'any',
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
      <ScrollView>
        <GeneralRulesComponent
          title={'General Rules'}
          options={options.general}
          setOptions={(general: generalRules) =>
            setOptions({...options, general: general})
          }
        />
        <ArmorRulesComponent
          options={options.armor}
          setOptions={(armor: inventoryRules['armor']) =>
            setOptions({...options, armor: armor})
          }
        />
        <Text>General Restricted: {options.general.restricted.toString()}</Text>
        <Text>General Price: {options.general.price.toString()}</Text>
        <Text>General Rarity: {options.general.rarity.toString()}</Text>
        <Text>General Unique: {options.general.is_unique.toString()}</Text>
        <Spacer />
        <Text>Armor Limit: {options.armor.limit.toString()}</Text>
        <Text>
          Armor Restricted: {options.armor.general.restricted.toString()}
        </Text>
        <Text>Armor Price: {options.armor.general.price.toString()}</Text>
        <Text>Armor Rarity: {options.armor.general.rarity.toString()}</Text>
        <Text>Armor Unique: {options.armor.general.is_unique.toString()}</Text>
        <Text>Armor Defense: {options.armor.defense.toString()}</Text>
        <Text>Armor Soak: {options.armor.soak.toString()}</Text>
        <Text>Armor Encumbrance: {options.armor.encumbrance.toString()}</Text>
        <Text>Armor Hardpoints: {options.armor.hardpoints.toString()}</Text>
      </ScrollView>
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
