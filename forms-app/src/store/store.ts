import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from '@/store/countries-slice';
import formReducer from '@/store/form-slice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
