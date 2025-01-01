export const fetchWeather = async (city) => {
  const apiKey = '121f1c387485e532c0bfe71644cff1bb'
  const url = 'https://api.openweathermap.org/data/3.0/weather?q=${city}&units=metric&appid=${apiKey}';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json()
};