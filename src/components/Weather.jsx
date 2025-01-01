import React, { useState } from 'react';
import { useWeather } from './redux/WeatherContext';

const Weather = () => {
  const [city, setCity] = useState('');
  const { weatherData, error, loading, getWeather } = useWeather();

  const handleSearch = () => {
    if (city) {
      getWeather(city);
    }
  }

  return (
      <div className="weather-container">
          <h1>Weather App</h1>
          <div>
              <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
              />
              <button onClick={handleSearch}>Get Weather</button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {weatherData && (
              <div className="weather-info">
                  <h2>{weatherData.name}</h2>
                  <p>Temperature: {weatherData.main.temp} °CZ</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
          )}
      </div>
  );
};