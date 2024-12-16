import axios from 'axios';
import React, { useState } from 'react';

const ImageSearch = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'POST',
            url: 'https://google-api31.p.rapidapi.com/imagesearch',
            headers: {
                'x-rapidapi-key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                text: query,
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
            console.log('Response Data:', response.data); // Log the response data
            setImages(response.data.result || []); // Adjust based on actual response structure
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h1>Image Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for images"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                            <img src={image.thumbnail} alt={image.title} style={{ width: '200px', height: 'auto' }} />
                        </a>
                        <p>{image.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSearch;
