import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = "121f1c387485e532c0bfe71644cff1bb"

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({city = 'london'}) => {
        let url = `weather?q=${city}&units=metric&appid=${API_KEY}`;
        return url;
      },
    }),
  }),
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5,
});

export const {useGetWeatherQuery} = weatherApi
