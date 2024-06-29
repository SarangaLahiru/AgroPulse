import axios from 'axios';
import React, { useEffect, useState } from 'react';

const apiKey = '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52'; // Replace with your RapidAPI key
const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key

const App = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [error, setError] = useState(null);
    const [input, setInput] = useState('');

    // Fetch user's current location
    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await getCurrentPosition();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setLoadingLocation(false);
                setError(null);
            } catch (error) {
                setError('Location permission denied or not supported by browser.');
                setLoadingLocation(false);
            }
        };

        getLocation();
    }, []);

    // Fetch city and country using reverse geocoding
    useEffect(() => {
        const fetchCityAndCountry = async () => {
            if (latitude && longitude) {
                try {
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`;
                    const response = await axios.get(apiUrl);

                    if (response.data.results.length > 0) {
                        const addressComponents = response.data.results[0].address_components;
                        const city = findAddressComponent(addressComponents, 'locality');
                        const country = findAddressComponent(addressComponents, 'country');

                        setCity(city);
                        setCountry(country);
                    } else {
                        setError('City and country not found.');
                    }
                } catch (error) {
                    setError('Error fetching location details.');
                }
            }
        };

        fetchCityAndCountry();
    }, [latitude, longitude]);

    // Fetch weather data based on city and country
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (city && country) {
                setLoadingWeather(true);
                setError(null);

                try {
                    const weatherUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json`;
                    const response = await axios.get(weatherUrl, {
                        params: {
                            q: `${city},${country}`,
                            days: 7
                        },
                        headers: {
                            'x-rapidapi-key': apiKey,
                            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                        }
                    });

                    setWeatherData(response.data);
                } catch (error) {
                    setError('Error fetching weather data.');
                } finally {
                    setLoadingWeather(false);
                }
            }
        };

        fetchWeatherData();
    }, [city, country]);

    // Function to fetch YouTube videos
    const fetchYouTubeVideos = async () => {
        setLoadingVideos(true);
        setError(null);

        const options = {
            method: 'GET',
            url: 'https://youtube-v2.p.rapidapi.com/search/',
            params: {
                query: input,
                lang: 'en',
                order_by: 'this_month',
                country: 'us'
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setVideos(response.data.videos || []);
        } catch (error) {
            setError('Error fetching YouTube videos.');
        } finally {
            setLoadingVideos(false);
        }
    };

    // Function to fetch images
    const fetchImages = async () => {
        setLoadingImages(true);
        setError(null);

        const options = {
            method: 'POST',
            url: 'https://google-api31.p.rapidapi.com/imagesearch',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                text: input,
                safesearch: 'off',
                region: 'wt-wt',
                color: '',
                size: '',
                type_image: '',
                layout: '',
                max_results: 100
            }
        };

        try {
            const response = await axios.request(options);
            setImages(response.data.result || []);
        } catch (error) {
            setError('Error fetching images.');
        } finally {
            setLoadingImages(false);
        }
    };

    // Function to handle sending messages to Chat API
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        setLoadingChat(true);
        setError(null);

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                messages: newMessages,
                system_prompt: '',
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            }
        };

        try {
            const response = await axios.request(options);
            const botMessage = response.data.result;
            setMessages([...newMessages, { role: 'bot', content: botMessage }]);
        } catch (error) {
            setError('Error fetching response from ChatGPT API.');
        } finally {
            setLoadingChat(false);
        }
    };

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const findAddressComponent = (addressComponents, type) => {
        return addressComponents.find(component => component.types.includes(type))?.long_name || '';
    };

    return (
        <div>
            <h1>Weather, YouTube & Image Search, and Chat with GPT</h1>

            {/* Location Tracker */}
            <div>
                <h2>Location Tracker</h2>
                {loadingLocation && <p>Loading location...</p>}
                {error && <p>Error: {error}</p>}
                {!loadingLocation && !error && (
                    <div>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </div>
                )}
            </div>

            {/* Weather Forecast */}
            <div>
                <h2>Weather Forecast</h2>
                {loadingWeather && <p>Loading weather forecast...</p>}
                {error && <p>Error: {error}</p>}
                {weatherData && (
                    <div>
                        <h3>Forecast for {city}, {country}</h3>
                        <ul>
                            {weatherData.forecast.forecastday.map(day => (
                                <li key={day.date}>
                                    <strong>{day.date}</strong>: {day.day.condition.text}, High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* YouTube Video Search */}
            <div>
                <h2>YouTube Video Search</h2>
                <form onSubmit={fetchYouTubeVideos}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search for videos"
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {loadingVideos && <p>Loading videos...</p>}
                {error && <p>Error: {error}</p>}
                <ul>
                    {videos.map((video) => (
                        <li key={video.video_id}>
                            <h3>{video.title}</h3>
                            <p>{video.author}</p>
                            <p>{video.number_of_views} views</p>
                            <p>Length: {video.video_length}</p>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${video.video_id}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Image Search */}
            <div>
                <h2>Image Search</h2>
                <form onSubmit={fetchImages}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search for images"
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {loadingImages && <p>Loading images...</p>}
                {error && <p>Error: {error}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ margin: '10px' }}>
                            <a href={image.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={image.thumbnail}
                                    alt={image.title}
                                    style={{ width: '200px', height: 'auto' }}
                                />
                            </a>
                            <p>{image.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat with GPT */}
            <div>
                <h2>Chat with GPT</h2>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message"
                        required
                    />
                    <button type="submit">Send</button>
                </form>
                {loadingChat && <p>Loading chat...</p>}
                {error && <p>Error: {error}</p>}
                <div>
                    {messages.map((message, index) => (
                        <div key={index} className={message.role}>
                            <strong>{message.role === 'user' ? 'You' : 'Bot'}: </strong>
                            <span>{message.content}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
