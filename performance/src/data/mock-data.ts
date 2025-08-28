import type { CO2Data } from "@/types/co2-data";

export const mockData: CO2Data = {
  Afghanistan: {
    iso_code: 'AFG',
    data: [
      {
        year: 2020,
        population: 39068978,        
        co2: 11.605929374694824,
        co2_per_capita: 0.2970625162124634,
      },
      {
        year: 2019,
        population: 37856126,
        co2: 10.82514476776123,
        co2_per_capita: 0.28595489263534546,
      },
    ],
  },
  Vatican: {
    iso_code: 'VAT',
    data: [
      {
        year: 2019,
        population: 543,
      },
      {
        year: 2020,
        population: 536,
      },
      {
        year: 2021,
        population: 527,
      },
      {
        year: 2022,
        population: 513,
      },
      {
        year: 2023,
        population: 501,
      },
    ],
  },
  Namibia: {
    iso_code: 'NAM',
    data: [
      {
        year: 2019,
        population: 2650500,
        co2: 4.238951206207275,
        co2_per_capita: 1.5993024110794067,
      },
      {
        year: 2020,
        population: 2728763,
        co2: 3.832063913345337,
        co2_per_capita: 1.4043227434158325,
      },
      {
        year: 2021,
        population: 2810553,
        co2: 3.900918960571289,
        co2_per_capita: 1.3879542350769043,
      },
      {
        year: 2022,
        population: 2889668,
        co2: 4.0848469734191895,
        co2_per_capita: 1.4136042594909668,
      },
      {
        year: 2023,
        population: 2963101,
        co2: 4.174205780029297,
        co2_per_capita: 1.408728837966919,
      },
    ],
  },
  Nauru: {
    iso_code: 'NRU',
    data: [
      {
        year: 2019,
        population: 11609,
        co2: 0.05496000126004219,
        co2_per_capita: 4.734257698059082,
      },
      {
        year: 2020,
        population: 11665,
        co2: 0.05129599943757057,
      },
      {
        year: 2021,
        population: 11726,
        co2: 0.05496000126004219,
        co2_per_capita: 4.687020301818848,
      },
      {
        year: 2022,
        population: 11821,
        co2: 0.056276001036167145,
        co2_per_capita: 4.760680198669434,
      },
      {
        year: 2023,
        population: 11900,
        co2: 0.057498998939991,
        co2_per_capita: 4.831848621368408,
      },
    ],
  },
  Zimbabwe: {
    iso_code: 'ZWE',
    data: [
      {
        year: 2019,
        population: 15271377,
        co2: 10.26294994354248,
        co2_per_capita: 0.6720382571220398,
      },
      {
        year: 2020,
        population: 15526888,
        gdp: 23178706944.0,
        co2: 8.494503021240234,
      },
      {
        year: 2021,
        population: 15797220,
        co2: 10.203630447387695,
        co2_per_capita: 0.6459130048751831,
      },
      {
        year: 2022,
        population: 16069061,
        co2: 10.42494010925293,
        co2_per_capita: 0.6487585306167603,
      },
      {
        year: 2023,
        population: 16340829,
        co2: 11.164030075073242,
        co2_per_capita: 0.6831985116004944,
      },
    ],
  },
  Europe: {
    data: [
      {
        year: 2019,
        population: 750791010,
        co2: 5436.90576171875,
        co2_per_capita: 7.245029926300049,
      },
      {
        year: 2020,
        population: 750826495,
        co2: 5026.3154296875,
        co2_per_capita: 6.697587490081787,
      },
      {
        year: 2021,
        population: 749931027,
        co2: 5304.03955078125,
        co2_per_capita: 7.076113700866699,
      },
      {
        year: 2022,
        population: 748296158,
        co2: 5228.8701171875,
        co2_per_capita: 6.9910888671875,
      },
      {
        year: 2023,
        population: 746948103,
        co2: 4993.22119140625,
        co2_per_capita: 6.688086032867432,
      },
    ],
  },
  'Europe (GCP)': {
    data: [
      {
        year: 2019,
        co2: 5436.90576171875,
        consumption_co2: 5968.4111328125,
      },
      {
        year: 2020,
        co2: 5026.3154296875,
        consumption_co2: 5523.72216796875,
      },
      {
        year: 2021,
        co2: 5304.03955078125,
        consumption_co2: 5881.98583984375,
      },
      {
        year: 2022,
        co2: 5228.86962890625,
        consumption_co2: 5904.31787109375,
      },
      {
        year: 2023,
        co2: 4993.22119140625,
      },
    ],
  },
};