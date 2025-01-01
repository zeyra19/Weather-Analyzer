import React, { createContext, useState, useContext } from 'react';
import {fetchWeather} from '../services/weather';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city)
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, error, loading, getWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext)