import {createSelector, createSlice} from '@reduxjs/toolkit';
import {
  GeneralOptions,
  InventoryOptions,
} from '../../models/InventoryOptionsIndex';

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
  attachments: {
    general: defaultGeneralOptions,
    limit: 'any',
    categories: 'any', // Key from db
    encumbrance: 'any',
    hardpoints: 'any',
  },
  gear: {
    general: defaultGeneralOptions,
    limit: 'any',
    categories: 'any', // Key from db
    encumbrance: 'any',
  },
  planetaryVehicles: {
    general: defaultGeneralOptions,
    type: 'any',
    categories: 'any',
    manufacturer: 'any',
    model: 'any',
    silhouette: 'any',
    speed: 'any',
    handling: 'any',
    armor: 'any',
    htt: 'any',
    sst: 'any',
    defense: 'any',
    sensors: 'any',
    crew: 'any',
    encumbrance: 'any',
    passengers: 'any',
    hardpoints: 'any',
    weapons: 'any',
  },
  starships: {
    general: defaultGeneralOptions,
    type: 'any',
    categories: 'any',
    manufacturer: 'any',
    model: 'any',
    silhouette: 'any',
    speed: 'any',
    handling: 'any',
    armor: 'any',
    htt: 'any',
    sst: 'any',
    defense: 'any',
    sensors: 'any',
    crew: 'any',
    encumbrance: 'any',
    passengers: 'any',
    hardpoints: 'any',
    weapons: 'any',
    navicomputer: 'any',
    additionalRules: 'any',
  },
  vehicleAttachments: {
    general: defaultGeneralOptions,
    limit: 'any',
    hardpoints: 'any',
  },
  vehicleWeapons: {
    general: defaultGeneralOptions,
    limit: 'any',
    categories: 'any',
    ranges: 'any',
    damage: 'any',
    crit: 'any',
    compatibleSilhouette: 'any',
    effects: 'any',
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

const initialState = {
  status: 'idle',
  entities: {
    location: 0,
    inventoryOptions: defaultInventoryOptions,
  },
};

export const selectOptions = createSelector(
  state => state.shopSlice.entities.inventoryOptions,
  inventoryOptions => inventoryOptions,
);

export const shopSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    optionsChanged(state, action) {
      const options = action.payload;
      state.entities = options;
    },
    setDefaultOptions(state) {
      state.entities = initialState.entities;
    },
  },
});

export const {optionsChanged, setDefaultOptions} = shopSlice.actions;
export default shopSlice.reducer;
