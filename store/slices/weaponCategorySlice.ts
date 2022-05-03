import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {WeaponCategoryList} from '../../models/ItemIndex';
import {getDBConnection} from '../../services/db-service';
import {
  getDBWeaponsState,
  getWeaponItems,
} from '../../services/db-service-weapons';

export interface WeaponCategoryState {
  categories: WeaponCategoryList | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WeaponCategoryState = {
  categories: null,
  status: 'idle',
};

export const fetchWeaponCategoriesAsync = createAsyncThunk(
  'weaponCategory/fetchCategories',
  async () => {
    const db = await getDBConnection();
    const weaponState = await getDBWeaponsState(db);
    const response = await getWeaponItems(db, weaponState, 'Items');

    return response.items;
  },
);

export const weaponCategorySlice = createSlice({
  name: 'weaponCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeaponCategoriesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWeaponCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchWeaponCategoriesAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectWeaponCategories = (state: RootState) =>
  state.weaponCategories.categories;

export default weaponCategorySlice.reducer;
