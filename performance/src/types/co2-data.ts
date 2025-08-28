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