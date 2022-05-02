import {ScrollView, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  generalOptions,
  inventoryOptions,
} from '../../models/InventoryOptionsIndex';
import {DBState, ListItem} from '../../models/ItemIndex';
import {ArmorOptions} from './ArmorOptons';
import {GeneralOptions} from './GeneralOptions';
import {WeaponOptions} from './WeaponOptions';

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
    general: defaultGeneralOptions,
    limit: 'any',
    defense: 'any',
    soak: 'any',
    encumbrance: 'any',
    hardpoints: 'any',
  },
  weapons: {
    general: defaultGeneralOptions,
    limit: 'any',
    categories: 'any',
    skills: 'any',
    damage: 'any',
    crit: 'any',
    ranges: 'any',
    effects: 'any',
    encumbrance: 'any',
    hardpoints: 'any',
  },
};
const anyOptions = defaultOptions;

// The main component.
// Don't let all the variables scare you. Look at models/InventoryOptionsIndex.ts to see what they all mean.
export const InventoryOptions: React.FC<{dbState: DBState}> = ({dbState}) => {
  // General options
  const [options, setOptions] = useState<inventoryOptions>(defaultOptions);
  return (
    <ScrollView stickyHeaderIndices={[0]} nestedScrollEnabled={true}>
      <VStack space={2} backgroundColor={'primary.100'}>
        <Text>
          Weapons Restricted: {options.weapons.general.restricted.toString()}
        </Text>
        <Text>Weapons Price: {options.weapons.general.price.toString()}</Text>
        <Text>Weapons Rarity: {options.weapons.general.rarity.toString()}</Text>
        <Text>
          Weapons Unique: {options.weapons.general.is_unique.toString()}
        </Text>
        <Text>
          Weapon Categories:{' '}
          {options.weapons.categories === 'any'
            ? 'any'
            : (options.weapons.categories as ListItem[]).map(
                item => item.item + '\t',
              )}
        </Text>
        <Text>
          Weapon Skills:{' '}
          {options.weapons.skills === 'any'
            ? 'any'
            : (options.weapons.skills as ListItem[]).map(
                item => item.item + '\t',
              )}
        </Text>
        <Text>Weapons Damage: {options.weapons.damage.toString()}</Text>
        <Text>Weapons Crit: {options.weapons.crit.toString()}</Text>
        <Text>
          Weapon Ranges:{' '}
          {options.weapons.ranges === 'any'
            ? 'any'
            : (options.weapons.ranges as ListItem[]).map(
                item => item.item + '\t',
              )}
        </Text>
        <Text>
          Weapon Effects:{' '}
          {options.weapons.effects === 'any'
            ? 'any'
            : (options.weapons.effects as ListItem[]).map(
                item => item.item + '\t',
              )}
        </Text>
        <Text>
          Weapons Encumbrance: {options.weapons.encumbrance.toString()}
        </Text>
        <Text>Weapons Hardpoints: {options.weapons.hardpoints.toString()}</Text>
      </VStack>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Options</Text>
      </View>
      <VStack space={3}>
        <View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>General Options</Text>
          </View>
          <GeneralOptions
            title={'General Options'}
            options={options.general}
            setOptions={(general: generalOptions) =>
              setOptions({...options, general: general})
            }
            defaultOptions={defaultOptions.general}
            anyOptions={anyOptions.general}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Armor Options</Text>
        </View>
        <ArmorOptions
          options={options.armor}
          setOptions={(armor: inventoryOptions['armor']) =>
            setOptions({...options, armor: armor})
          }
          defaultOptions={defaultOptions}
          anyOptions={anyOptions}
        />

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Weapon Options</Text>
        </View>
        <WeaponOptions
          options={options.weapons}
          setOptions={(weapons: inventoryOptions['weapons']) =>
            setOptions({...options, weapons: weapons})
          }
          defaultOptions={defaultOptions}
          anyOptions={anyOptions}
          dbState={dbState.weapons}
        />
      </VStack>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
  },
  headerText: {fontSize: 20},
  optionsContainer: {marginBottom: 20},
  option: {flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1},
});
