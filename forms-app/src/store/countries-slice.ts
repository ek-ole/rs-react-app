import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type CountriesState = {
  list: string[];
  loading: boolean;
  error: string | null;
};

export const fetchCountries = createAsyncThunk<string[]>('countries/fetchCountries', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
  const data = (await response.json()) as { name: { common: string } }[];

  return data.map((c) => c.name.common).sort((a, b) => a.localeCompare(b));
});

const initialState: CountriesState = {
  list: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch countries';
      });
  },
});

export default countriesSlice.reducer;
