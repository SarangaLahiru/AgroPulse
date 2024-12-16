import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PestForecastPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [agriculturalField, setAgriculturalField] = useState('');
    const [pestForecast, setPestForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedWeatherData = localStorage.getItem('weatherData');
        if (storedWeatherData) {
            setWeatherData(JSON.parse(storedWeatherData));
        }
    }, []);

    const generatePestForecast = async () => {
        if (!weatherData) return;

        setLoading(true);
        setError('');

        const prompt = `Based on the weather data, predict the potential pests for ${agriculturalField} fields. Include only the pest names and brief descriptions as points.`;

        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            headers: {
                'x-rapidapi-key': '96649f9467mshd1f181858893441p14bea3jsn78aef8c3fa15',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                messages: [{ role: 'user', content: prompt }],
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
            console.log(botMessage)

            const formattedPestForecast = formatPestForecast(botMessage);
            setPestForecast(formattedPestForecast);

            // Fetch images for each pest
            fetchImagesForPests(formattedPestForecast);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to get response from ChatGPT API');
        } finally {
            setLoading(false);
        }
    };

    const formatPestForecast = (forecast) => {
        if (!forecast) return [];

        const lines = forecast.split('\n').filter(line => line.trim() !== '');
        const pests = [];
        let currentPest = null;

        lines.forEach(line => {
            const match = line.match(/^\d+\)\s*(.*?):\s*(.*)$/);
            if (match) {
                if (currentPest) {
                    pests.push(currentPest);
                }
                const [, name, description] = match;
                currentPest = {
                    name: name.trim(),
                    description: description.trim()
                };
            } else if (currentPest) {
                currentPest.description += ` ${line.trim()}`;
            }
        });

        if (currentPest) {
            pests.push(currentPest);
        }

        return pests;
    };

    const fetchImagesForPests = async (pests) => {
        const pestImages = [];

        for (let i = 0; i < pests.length; i++) {
            const pest = pests[i];
            try {
                const response = await axios.post('https://google-api31.p.rapidapi.com/imagesearch', {
                    text: `${pest.name} pest`,
                    safesearch: 'off',
                    region: 'wt-wt',
                    color: '',
                    size: '',
                    type_image: '',
                    layout: '',
                    max_results: 1
                }, {
                    headers: {
                        'x-rapidapi-key': '96649f9467mshd1f181858893441p14bea3jsn78aef8c3fa15',
                        'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    }
                });

                const imageUrl = response.data?.result[0]?.thumbnail || '';
                pestImages.push({ ...pest, imageUrl });
            } catch (error) {
                console.error(`Error fetching image for ${pest.name}:`, error);
                pestImages.push({ ...pest, imageUrl: '' });
            }
        }

        setPestForecast(pestImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generatePestForecast();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
            <div className="bg-white text-blue-700 p-8 rounded-lg shadow-lg text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">Pest Forecast Page</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {weatherData ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Weather Data Loaded</h2>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <label className="block mb-4">
                                <span className="text-gray-700">Agricultural Field:</span>
                                <input
                                    type="text"
                                    value={agriculturalField}
                                    onChange={(e) => setAgriculturalField(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="e.g., rice, tomato"
                                />
                            </label>

                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none">
                                Generate Pest Forecast
                            </button>
                        </form>

                        {loading ? (
                            <p className="mt-4 text-gray-600">Loading...</p>
                        ) : (
                            pestForecast.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-2xl font-semibold mb-6">Pest Forecast:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {pestForecast.map((pest, index) => (
                                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                                {pest.imageUrl && (
                                                    <Link to={`/pest/${encodeURIComponent(pest.name)}`} target="_blank" rel="noopener noreferrer">
                                                        <img
                                                            src={pest.imageUrl}
                                                            alt={pest.name}
                                                            className="mb-4 mx-auto rounded-md"
                                                            style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }}
                                                            onError={() => console.log(`Error loading image for ${pest.name}`)}
                                                        />
                                                    </Link>
                                                )}
                                                <div className="text-center">
                                                    <p className="text-lg font-semibold mb-2">{pest.name}</p>
                                                    <p className="text-gray-600">{pest.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <p className="mt-4 text-lg">No weather data available. Please go to the Forecast Page and get the weather data first.</p>
                )}
            </div>
        </div>
    );
};

export default PestForecastPage;
