import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Character } from '@/types/character';

type SelectedCharactersState = {
  ids: number[];
  characters: Character[];
};

const initialState: SelectedCharactersState = {
  ids: [],
  characters: [],
};

export const slice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;
      const exists = state.ids.includes(id);
      state.ids = exists ? state.ids.filter((i) => i !== id) : [...state.ids, id];
      state.characters = exists
        ? state.characters.filter((c) => c.id !== id)
        : [...state.characters, action.payload];
    },
    clearAll: (state) => {
      state.ids = [];
      state.characters = [];
    },
  },
});

export const { toggle, clearAll } = slice.actions;
export default slice.reducer;
