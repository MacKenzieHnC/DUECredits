import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import {databaseSlice} from './slices/databaseSlice';

export const store = configureStore({
  reducer: {
    appSlice,
    [databaseSlice.reducerPath]: databaseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(databaseSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
