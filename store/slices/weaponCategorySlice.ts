import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {WeaponItem} from '../../models/ItemIndex';
import {getDBConnection} from '../../services/db-service';
import {getWeaponItems} from '../../services/db-service-weapons';

export interface WeaponCategoryState {
  items: WeaponItem[] | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WeaponCategoryState = {
  items: null,
  status: 'idle',
};

export const fetchWeaponCategoriesAsync = createAsyncThunk(
  'weaponCategory/fetchCategories',
  async () => {
    const db = await getDBConnection();
    const response = await getWeaponItems(db, 'Items');

    return response;
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
        state.items = action.payload;
      })
      .addCase(fetchWeaponCategoriesAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectWeaponCategories = (state: RootState) =>
  state.weaponCategories.items;

export default weaponCategorySlice.reducer;
