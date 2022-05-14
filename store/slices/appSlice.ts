import {createSelector, createSlice} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks/redux';
import {getDBConnection} from '../../services/db-service';
import {newShop} from '../../services/db-service-shops';

const initialState = {status: 'idle', entities: 0};

export const appSlice = createSlice({
  name: 'currentShop',
  initialState,
  reducers: {
    currentShopChanged(state, action) {
      state.entities = action.payload;
    },
  },
});

export const selectCurrentShopID = createSelector(
  (state: any) => state.appSlice.entities,
  currentShop => currentShop,
);

export const {currentShopChanged} = appSlice.actions;
export default appSlice.reducer;
