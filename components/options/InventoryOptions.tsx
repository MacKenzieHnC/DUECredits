import {ScrollView, Spacer, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  generalOptions,
  inventoryOptions,
} from '../../models/InventoryOptionsIndex';
import {ArmorOptions} from './ArmorOptons';
import {GeneralOptions} from './GeneralOptions';

// TODO: Load these in from database
const defaultGeneralOptions: generalOptions = {
  restricted: 'any',
  price: 'any',
  rarity: 'any',
  is_unique: 'any',
};
const defaultOptions: inventoryOptions = {
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
// Don't let all the variables scare you. Look at models/InventoryOptionsIndex.ts to see what they all mean.
export const InventoryOptions: React.FC<{}> = () => {
  // General options
  const [options, setOptions] = useState<inventoryOptions>(defaultOptions);
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.headerTextContainer}>
        <Text>Options</Text>
      </View>
      <ScrollView>
        <GeneralOptions
          title={'General Options'}
          options={options.general}
          setOptions={(general: generalOptions) =>
            setOptions({...options, general: general})
          }
          defaultOptions={defaultOptions.general}
          anyOptions={anyOptions.general}
        />
        <ArmorOptions
          options={options.armor}
          setOptions={(armor: inventoryOptions['armor']) =>
            setOptions({...options, armor: armor})
          }
          defaultOptions={defaultOptions}
          anyOptions={anyOptions}
        />
        <View>
          <Text>
            General Restricted: {options.general.restricted.toString()}
          </Text>
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
          <Text>
            Armor Unique: {options.armor.general.is_unique.toString()}
          </Text>
          <Text>Armor Defense: {options.armor.defense.toString()}</Text>
          <Text>Armor Soak: {options.armor.soak.toString()}</Text>
          <Text>Armor Encumbrance: {options.armor.encumbrance.toString()}</Text>
          <Text>Armor Hardpoints: {options.armor.hardpoints.toString()}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContainer: {backgroundColor: 'indigo', marginBottom: 20},
  option: {flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1},
});
