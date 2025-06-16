import React, { useState } from 'react';
import './Style.css';
import clearIcon from '../assets/images/clear.png';
import cloudsIcon from '../assets/images/clouds.png';
import drizzleIcon from '../assets/images/drizzle.png';
import mistIcon from '../assets/images/mist.png';
import snowIcon from '../assets/images/snow.png';


import searchIcon from '../assets/images/search.png';
import rainIcon from '../assets/images/rain.png';
import humidityIcon from '../assets/images/humidity.png';
import windIcon from '../assets/images/wind.png';

const WeatherPage = () => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchWeather = () => {
    const cityName = input.trim();
    if (cityName === '') {
      alert('Enter the City Name');
      return;
    }
    setInput('');
    fetchWeatherDetails(cityName);
  };

  const fetchWeatherDetails = async (city) => {
    const WURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9b61b8b8083f2ebaf23f70ed9ed3768`;
    try {
      const response = await fetch(WURL);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData({
          temp: Math.round(data.main.temp - 273.15),
          city: data.name,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          condition: data.weather[0].main,
        });
      } else {
        alert('City not found');
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Clear':
      return clearIcon;
    case 'Clouds':
      return cloudsIcon;
    case 'Drizzle':
      return drizzleIcon;
    case 'Rain':
      return rainIcon;
    case 'Snow':
      return snowIcon;
    case 'Mist':
      return mistIcon;
    default:
      return clearIcon;
  }
};


  return (
    <div className="card">
      <div className="search">
        <input
          className="input-feild"
          type="text"
          placeholder="Enter the City Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button id="search-button" onClick={handleSearchWeather}>
          <img src={searchIcon} alt="search" />
        </button>
      </div>

      {weatherData && (
        <div className="weather">
          <img
            src={getWeatherIcon(weatherData.condition)} className="weather-icon" id="weather-icon" alt="weather"/>
          <h1 className="temp">{weatherData.temp}°C</h1>
          <h2 className="city">{weatherData.city}</h2>

          <div className="details">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p className="humidity">{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} alt="wind" />
              <div>
                <p className="wind">{weatherData.wind} Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
