import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCountries } from '@/store/countries-slice';
import type { RootState, AppDispatch } from '@/store/store';

export const useCountries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.countries);

  useEffect(() => {
    if (list.length === 0 && !loading) {
      void dispatch(fetchCountries());
    }
  }, [dispatch, list.length, loading]);

  return { countries: list, loading, error };
};