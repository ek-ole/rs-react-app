import { use } from 'react';
 
import { mockData } from '@/data/mock-data';
import type { CO2Data } from '@/types/co2-data';

function fetchData(): Promise<CO2Data> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 3000);
  });
}

const dataPromise = fetchData();

export function useCountries(): CO2Data {
   return use(dataPromise);
}