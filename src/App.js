import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/current-weather';
import Forecast from './components/search/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setIsLoading(true);
    setError(null);

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        if (!response[0].ok || !response[1].ok) {
          throw new Error("Could not fetch weather data for this location.");
        }
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong fetching the weather. Please try again.");
        setCurrentWeather(null);
        setForecast(null);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {isLoading && <p className="status-message">Loading weather...</p>}
      {error && <p className="status-message error">{error}</p>}
      {!isLoading && !error && !currentWeather && (
        <p className="status-message">Search for a city to see the weather.</p>
      )}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
