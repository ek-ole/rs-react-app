export type YearlyData = {
  year: number;
  population?: number | null;
  co2?: number | null;
  co2_per_capita?: number | null;
  [key: string]: number | null | undefined;
};

export type CountryData = {
  iso_code?: string;
  data: YearlyData[];
};

export type CO2Data = Record<string, CountryData>;

export type SortConfig = {
  key: 'name' | 'population' | 'isoCode';
  direction: 'asc' | 'desc';
};

export type CountryItem = {
  name: string;
  isoCode: string | undefined;
  population: number | null | undefined;
  year: number | undefined;
  co2: number | null | undefined;
  co2_per_capita: number | null | undefined;
  [key: string]: string | number | null | undefined;
};