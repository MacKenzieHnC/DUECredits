import {ScrollView} from 'native-base';
import React, {useState} from 'react';
import {
  GeneralOptions,
  InventoryOptions,
  ShopOptions,
} from '../../models/InventoryOptionsIndex';
import {LoadingScreen} from '../LoadingScreen';
import {InventoryOptionsComponent} from './InventoryOptions';

export const ShopOptionsComponent = () => {
  // TODO: Load these in from database
  const defaultGeneralOptions: GeneralOptions = {
    restricted: 'any',
    price: 'any',
    rarity: 'any',
    is_unique: 'any',
  };
  const defaultInventoryOptions: InventoryOptions = {
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

  const defaultOptions: ShopOptions = {
    inventoryOptions: defaultInventoryOptions,
    location: 0,
  };

  const anyOptions = defaultOptions;

  const [options, setOptions] = useState<null | ShopOptions>(defaultOptions);

  return !options ? (
    <LoadingScreen text="Loading options" />
  ) : (
    <ScrollView stickyHeaderIndices={[0]} nestedScrollEnabled={true}>
      <InventoryOptionsComponent
        options={options!.inventoryOptions}
        setOptions={(inventoryOptions: InventoryOptions) =>
          setOptions({...options, inventoryOptions: inventoryOptions})
        }
        defaultOptions={defaultOptions.inventoryOptions}
        anyOptions={anyOptions.inventoryOptions}
      />
    </ScrollView>
  );
};
