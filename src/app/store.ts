import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';

import selectedReducer from '@/services/selected-characters';
import type { ApiResponse } from '@/types/api';
import type { Character } from '@/types/character';

const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, { name?: string; page: number }>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Character' as const, id })),
              { type: 'Characters', page: result.info.pages },
              { type: 'Characters', id: 'ALL' },
            ]
          : [{ type: 'Characters', id: 'ALL' }],
    }),

    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
      providesTags: (result, error, id) => [{ type: 'Character', id }],
    }),

    updateCharacter: builder.mutation<void, { id: string; data: Partial<Character> }>({
      query: ({ id, data }) => ({
        url: `character/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Character', id },
        { type: 'Characters', id: 'LIST' },
      ],
    }),

    invalidateCharacters: builder.mutation<void, void>({
      queryFn: () => ({ data: void 0 }),
      invalidatesTags: [{ type: 'Characters', id: 'All' }],
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
export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useUpdateCharacterMutation,
  useInvalidateCharactersMutation,
} = rickAndMortyApi;
