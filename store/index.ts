import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {databaseSlice} from './slices/databaseSlice';
import shopSlice from './slices/shopSlice';

export const store = configureStore({
  reducer: {
    shopSlice,
    [databaseSlice.reducerPath]: databaseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(databaseSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
