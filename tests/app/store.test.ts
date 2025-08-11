import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';

import { rickAndMortyApi } from '@/app/store';
import selectedReducer from '@/services/selected-characters';

const store = configureStore({
  reducer: {
    selectedCharacters: selectedReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

describe('Redux Toolkit Query API basic test', () => {
  it('store has correct reducers', () => {
    const state = store.getState();
    expect(state).toHaveProperty('selectedCharacters');
    expect(state).toHaveProperty(rickAndMortyApi.reducerPath);
  });

  it('dispatching getCharacters initiates an API call', async () => {
    const result = await store.dispatch(
      rickAndMortyApi.endpoints.getCharacters.initiate({ page: 1 }),
    );

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('fulfilledTimeStamp');
  });
});
