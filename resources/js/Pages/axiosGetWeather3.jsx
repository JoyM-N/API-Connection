import React, { useState,useEffect } from 'react';
import axios from 'axios';


function WeatherFetch() {
    const [weather, setWeather] = useState(
    () => {
        // Try to load from localStorage first
        const stored = localStorage.getItem('weather');
        return stored ? JSON.parse(stored) : null;
    }
    );
    const [loading, setLoading] = useState(true);
    const BASE_URL_3 = import.meta.env.VITE_BASE_URL_3;
    const API_KEY = import.meta.env.VITE_API_KEY;

useEffect(() => {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const city = 'London'; // You can change this to any city you want
    // axios.get(`${BASE_URL_3}/weather?q=${city}&appid=${API_KEY}&units=metric`)
    axios.get(`${proxyUrl}${encodeURIComponent(`${BASE_URL_3}/weather?q=${city}&appid=${API_KEY}&units=metric`)}`)
      .then(response => {
         const weatherData = JSON.parse(response.data.contents);
        setWeather(weatherData);
        localStorage.setItem('weather', JSON.stringify(weatherData));
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      })
      .finally(() => {
      setLoading(false);
    });
    //   });
  }, []);
  
  if (loading) return <p>Loading weather...</p>;

//   if (!weather) return <p>No weather data available</p>;
if (!weather || !weather.weather || !weather.main || !weather.wind) return <p>No weather data available</p>;
  return (
    <div>
        <h2>🌤 Weather in {weather.name}</h2>
      <ul>
        <li><strong>Condition:</strong> {weather.weather[0].description}</li>
        <li><strong>Temperature:</strong> {weather.main.temp}°C</li>
        <li><strong>Feels like:</strong> {weather.main.feels_like}°C</li>
        <li><strong>Humidity:</strong> {weather.main.humidity}%</li>
        <li><strong>Wind Speed:</strong> {weather.wind.speed} m/s</li>
      </ul>
        {/* <h2>Weather Data</h2>
        {weather ? (
            <pre>{JSON.stringify(weather, null, 2)}</pre>
        ) : (
            <p>No weather data available</p>
        )} */}
    </div>
);
}
export default WeatherFetch;