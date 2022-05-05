import {Text, View, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  GeneralOptions,
  InventoryOptions,
} from '../../models/InventoryOptionsIndex';
import {useGetDBStateQuery} from '../../store/slices/databaseSlice';
import {LoadingScreen} from '../LoadingScreen';
import {ArmorOptionsComponent} from './ArmorOptons';
import {GeneralOptionsComponent} from './GeneralOptions';
import {WeaponOptionsComponent} from './WeaponOptions';

interface InventoryOptionsProps {
  options: InventoryOptions;
  setOptions: Function;
  defaultOptions: InventoryOptions;
  anyOptions: InventoryOptions;
}

export const InventoryOptionsComponent: React.FC<InventoryOptionsProps> = ({
  options,
  setOptions,
  defaultOptions,
  anyOptions,
}) => {
  // General options
  const {data: dbState, isLoading: isLoadingDB} = useGetDBStateQuery();

  if (isLoadingDB || !dbState) {
    return <LoadingScreen text={'Loading DB'} />;
  }

  return (
    <VStack space={3}>
      <View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>General Options</Text>
        </View>
        <GeneralOptionsComponent
          title={'General Options'}
          options={options.general}
          setOptions={(general: GeneralOptions) =>
            setOptions({...options, general: general})
          }
          defaultOptions={defaultOptions.general}
          anyOptions={anyOptions.general}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Armor Options</Text>
      </View>
      <ArmorOptionsComponent
        options={options.armor}
        setOptions={(armor: InventoryOptions['armor']) =>
          setOptions({...options, armor: armor})
        }
        defaultOptions={defaultOptions}
        anyOptions={anyOptions}
      />

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Weapon Options</Text>
      </View>
      <WeaponOptionsComponent
        options={options.weapons}
        setOptions={(weapons: InventoryOptions['weapons']) =>
          setOptions({...options, weapons: weapons})
        }
        defaultOptions={defaultOptions}
        anyOptions={anyOptions}
        dbState={dbState.weapons}
      />
    </VStack>
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
