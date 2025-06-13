import React, { useState, useEffect } from 'react';

function WeatherFetch() {
    // Array of 10 cities as requested by teacher
    const cities = [
        'London',
        'New York', 
        'Tokyo',
        'Paris',
        'Sydney',
        'Dubai',
        'Mumbai',
        'Berlin',
        'Cairo',
        'Nairobi'
    ];

    const [weather, setWeather] = useState(() => {
        // Try to load from localStorage first
        const stored = localStorage.getItem('weather');
        return stored ? JSON.parse(stored) : null;
    });
    
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(() => {
        // Load last selected city from localStorage
        return localStorage.getItem('lastSelectedCity') || '';
    });
    const [error, setError] = useState(null);

    // Function to fetch weather for a specific city
    const fetchWeatherForCity = async (city) => {
        if (!city) return;
        
        setLoading(true);
        setError(null);
        
        try {
            // Your actual API configuration
            const BASE_URL_3 = import.meta.env.VITE_BASE_URL_3;
            const API_KEY = import.meta.env.VITE_API_KEY;
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            
            // Construct the API URL
            const apiUrl = `${BASE_URL_3}/weather?q=${city}&appid=${API_KEY}&units=metric`;
            const fullUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;
            
            console.log('Fetching weather for:', city);
            
            // Make the API call using fetch
            const response = await fetch(fullUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Parse the weather data from the proxy response
            const weatherData = JSON.parse(data.contents);
            
            console.log('Weather data received:', weatherData);
            
            // Update state with real weather data
            setWeather(weatherData);
            
            // Store in localStorage for persistence
            localStorage.setItem('weather', JSON.stringify(weatherData));
            localStorage.setItem('lastSelectedCity', city);
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            
            // More specific error messages
            if (error.message.includes('HTTP error')) {
                setError('Failed to connect to weather service. Please try again.');
            } else if (error.message.includes('JSON')) {
                setError('Invalid response from weather service. Please try again.');
            } else {
                setError('Unable to fetch weather data. Please check your internet connection and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCity) {
            fetchWeatherForCity(selectedCity);
        }
    };

    // Handle city selection change
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🌤 Weather App</h1>
            
            {/* Form with Select Component */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <div className="mb-4">
                    <label htmlFor="citySelect" className="block mb-2 text-sm font-bold text-gray-700">
                        Select a City:
                    </label>
                    <select 
                        id="citySelect"
                        value={selectedCity} 
                        onChange={handleCityChange}
                        className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">-- Choose a city --</option>
                        {/* Loop through cities array */}
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button 
                    onClick={handleSubmit}
                    disabled={!selectedCity || loading}
                    className={`w-full py-3 px-6 text-white font-semibold rounded-md transition-colors ${
                        selectedCity && !loading 
                            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-4">
                    <p className="text-gray-600">Loading weather for {selectedCity}...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-4">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            {/* Weather Display */}
            {weather && weather.weather && weather.main && weather.wind && !loading && (
                <div className="border border-gray-300 rounded-lg p-6 bg-blue-50">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        🌤 Weather in {weather.name}
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-gray-700">Condition:</span>
                            <span className="text-gray-800 capitalize">{weather.weather[0].description}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-gray-700">Temperature:</span>
                            <span className="text-gray-800 text-lg font-bold">{weather.main.temp}°C</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-gray-700">Feels like:</span>
                            <span className="text-gray-800">{weather.main.feels_like}°C</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="font-semibold text-gray-700">Humidity:</span>
                            <span className="text-gray-800">{weather.main.humidity}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="font-semibold text-gray-700">Wind Speed:</span>
                            <span className="text-gray-800">{weather.wind.speed} m/s</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Show message when no weather data and not loading */}
            {!weather && !loading && !error && (
                <div className="text-center py-8">
                    <p className="text-gray-600">
                        Please select a city to view weather information.
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherFetch;