import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SelectedCharactersState = {
  ids: number[];
};

const initialState: SelectedCharactersState = {
  ids: [],
};

export const slice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((i) => i !== id);
      } else {
        state.ids.push(id);
      }
    },
    clearAll: (state) => {
      state.ids = [];
    },
  },
});

export const { toggle, clearAll } = slice.actions;
export default slice.reducer;
