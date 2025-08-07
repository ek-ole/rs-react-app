import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';

import selectedReducer from '@/services/selected-characters';
import type { ApiResponse } from '@/types/api';

const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, { name?: string; page: number }>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
    }),
  }),
});

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const { useGetCharactersQuery } = rickAndMortyApi;
