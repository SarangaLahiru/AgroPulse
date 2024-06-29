import axios from 'axios';
import React, { useState } from 'react';

const Test = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'GET',
            url: 'https://youtube-v2.p.rapidapi.com/search/',
            params: {
                query: query,
                lang: 'en',
                order_by: 'this_month',
                country: 'us'
            },
            headers: {
                'x-rapidapi-key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Response Data:', response.data); // Log the response data
            setVideos(response.data.videos); // Adjust based on actual response structure
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
            <h1>YouTube Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for videos"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}

            <ul>
                {videos.map((video) => (
                    <li key={video.video_id}>
                        <h2>{video.title}</h2>
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
    );
};

export default Test;
