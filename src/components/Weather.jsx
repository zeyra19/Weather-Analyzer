import { useRef, useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useGetWeatherQuery } from '../redux/services/weather';
import './Weather.css';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

export const Weather = () => {
  const inputRef = useRef();
  const [city, setCity] = useState('undefined');
  const [errorMessage, setErrorMessage] = useState('undefined');
  const { data } = useGetWeatherQuery({ city });

  const handleSearch = () => {
    const inputValue = inputRef.current.value.trim();
    const validCityName = /^[a-zA-ZığüşçöİĞÜŞÇÖ\s]+$/;

    if (!inputValue) {
      setErrorMessage('Please enter a city name.');
    } else if (!validCityName.test(inputValue)) {
      setErrorMessage('City name can only contain letters and spaces');
    } else {
      setErrorMessage('');
      setCity(inputValue);
    }
  };

   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
      handleSearch();
      }
   };

   const handleFocus = (event) => {
      event.target.select();
   };

  const weatherData = data && {
    humidity: data.main.humidity,
    wind: data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name,
    icon: data.weather[0].icon,
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    inputElement.addEventListener('dblclick', () => inputElement.select());

    return () => {
      inputElement.removeEventListener('dblclick', () => inputElement.select());
    };
  }, [])

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          aria-label="Search"
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
        />
        <button
          className="search-button"
          onClick={handleSearch}
          aria-label="Search button"
        >
          <IoSearchOutline />
        </button>
      </div>
      {weatherData && (
        <div className="weather-details">
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              className="weather-icon"
              alt="Weather icon"
            />
            <div className="weather-info">
              <p className="temperature">{weatherData.temperature}°C</p>
              <p className="location">{weatherData.location}</p>
            </div>
          </div>
          <div className="weather-stats">
            <div className="stat">
              <img src={humidityIcon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="stat">
              <img src={windIcon} alt="Wind Speed" />
              <div>
                <p>{weatherData.wind} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
