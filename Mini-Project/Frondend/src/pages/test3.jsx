import axios from 'axios';
import React, { useState } from 'react';

const apiKey = '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52';

const WeatherForecast = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeatherForecast = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
                params: {
                    q: `${city},${country}`,
                    days: 7 // Adjust the number of forecast days as needed
                },
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            });
            setForecastData(response.data);
        } catch (error) {
            setError('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherForecast();
    };

    return (
        <div>
            <h2>Weather Forecast</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Get Forecast'}
                </button>
            </form>

            {error && <p>{error}</p>}

            {forecastData && (
                <div>
                    <h3>Forecast for {city}, {country}</h3>
                    <ul>
                        {forecastData.forecast.forecastday.map(day => (
                            <li key={day.date}>
                                <strong>{day.date}</strong>: {day.day.condition.text}, High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;
