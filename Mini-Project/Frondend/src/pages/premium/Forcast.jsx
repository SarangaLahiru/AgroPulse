import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCloudSun } from 'react-icons/fa'; // Importing an icon for the title
import { Link } from 'react-router-dom';

const apiKey = '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52'; // Replace with your weather API key

const ForecastPage = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newCountry, setNewCountry] = useState('');

    useEffect(() => {
        if (latitude && longitude) {
            fetchWeatherForecast(`${latitude},${longitude}`);
        }
    }, [latitude, longitude]);

    const fetchWeatherForecast = async (query) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
                params: {
                    q: query,
                    days: 7
                },
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            });
            const weatherData = response.data;
            setCity(weatherData.location.name);
            setCountry(weatherData.location.country);
            setWeatherData(weatherData);

            // Save weatherData to localStorage
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
        } catch (error) {
            setError('Error fetching weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const handleGetLocationWeather = async () => {
        try {
            const position = await getCurrentPosition();
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherForecast(`${newCity},${newCountry}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
            <div className="bg-white text-blue-700 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                <div className="flex justify-center items-center mb-4">
                    <FaCloudSun className="text-5xl" />
                    <h1 className="text-4xl font-bold ml-2">Weather Forecast</h1>
                </div>

                {loading ? (
                    <p className="text-lg font-semibold">Loading...</p>
                ) : error ? (
                    <p className="text-lg font-semibold text-red-600">Error: {error}</p>
                ) : weatherData ? (
                    <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-6">
                        <h2 className="text-2xl font-bold mb-4">Weather Forecast for {city}, {country}</h2>
                        <ul>
                            {weatherData.forecast.forecastday.map(day => (
                                <li key={day.date} className="mb-4 flex items-center">
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12 mr-4" />
                                    <div>
                                        <strong className="text-lg">{day.date}</strong>: {day.day.condition.text}, High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-6 w-full">
                    <label className="block mb-4">
                        <span className="text-gray-700">City:</span>
                        <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-gray-700">Country:</span>
                        <input
                            type="text"
                            value={newCountry}
                            onChange={(e) => setNewCountry(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </label>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none">
                        Get Weather
                    </button>
                </form>

                <button
                    onClick={handleGetLocationWeather}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 focus:outline-none"
                >
                    Get Weather for Current Location
                </button>

                {weatherData && (
                    <Link to="/pestForcast" className=" w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-28 rounded-md mt-12 focus:outline-none" style={{ position: "relative", top: "14px" }}>
                        Go to Pest Forecast
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ForecastPage;
