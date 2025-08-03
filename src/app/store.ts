import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import selectedReducer from '@/services/selected-characters';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
