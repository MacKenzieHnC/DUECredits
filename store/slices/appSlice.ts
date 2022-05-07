import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {status: 'idle', entities: 0};

export const appSlice = createSlice({
  name: 'currentShop',
  initialState,
  reducers: {
    currentShopChanged(state, action) {
      state = action.payload;
    },
  },
});

export const selectCurrentShop = createSelector(
  (state: any) => state.appSlice.entities,
  currentShop => currentShop,
);

export const {currentShopChanged} = appSlice.actions;
export default appSlice.reducer;
