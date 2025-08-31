import { use } from 'react';
 
import { mockData } from '@/data/mock-data';
import type { CO2Data } from '@/types/co2-data';

const DATA_URL = 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

function isCO2Data(data: unknown): data is CO2Data {
  return typeof data === 'object' && data !== null;
}

async function fetchRealData(): Promise<CO2Data> {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
 const data: unknown = await response.json(); 

 if (!isCO2Data(data)) {
   throw new Error('Invalid data format received from server');
 }

 return data;
}

async function fetchMockData(): Promise<CO2Data> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 2000);
  });
}

const dataPromise = import.meta.env.PROD ? fetchRealData() : fetchMockData();

export function useCountries(): CO2Data {
   return use(dataPromise);
}