import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PestDetailsPage = () => {
    const { name } = useParams();

    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [errorVideos, setErrorVideos] = useState(null);

    const [pestDetails, setPestDetails] = useState(null);
    const [loadingPestDetails, setLoadingPestDetails] = useState(false);
    const [errorPestDetails, setErrorPestDetails] = useState(null);

    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [errorImages, setErrorImages] = useState(null);

    useEffect(() => {
        const fetchPestDetails = async () => {
            setLoadingPestDetails(true);
            setErrorPestDetails(null);

            const prompt = `Can you give ${name} details? Include only the pest names and brief descriptions as points. Also, provide some solutions as points.`;

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
                console.log('ChatGPT API Response:', response.data.result);
                setPestDetails(response.data.result);
            } catch (error) {
                console.error('Error fetching pest details:', error);
                setErrorPestDetails(error);
            } finally {
                setLoadingPestDetails(false);
            }
        };

        const fetchYouTubeVideos = async () => {
            setLoadingVideos(true);
            setErrorVideos(null);

            const options = {
                method: 'GET',
                url: 'https://youtube-v2.p.rapidapi.com/search/',
                params: {
                    query: name + ' pest',
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
                console.log('YouTube API Response:', response.data);
                if (response.data.videos && response.data.videos.length > 0) {
                    setVideos(response.data.videos);
                } else {
                    setVideos([]);
                }
            } catch (error) {
                console.error('Error fetching YouTube videos:', error);
                setErrorVideos(error);
            } finally {
                setLoadingVideos(false);
            }
        };

        const fetchImages = async () => {
            setLoadingImages(true);
            setErrorImages(null);

            const options = {
                method: 'POST',
                url: 'https://google-api31.p.rapidapi.com/imagesearch',
                headers: {
                    'x-rapidapi-key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                    'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                data: {
                    text: name + ' pest',
                    safesearch: 'off',
                    region: 'wt-wt',
                    color: '',
                    size: '',
                    type_image: '',
                    layout: '',
                    max_results: 5
                }
            };

            try {
                const response = await axios.request(options);
                console.log('Image API Response:', response.data);
                setImages(response.data.result || []);
            } catch (error) {
                console.error('Error fetching images:', error);
                setErrorImages(error);
            } finally {
                setLoadingImages(false);
            }
        };

        if (name) {
            fetchPestDetails();
            fetchYouTubeVideos();
            fetchImages();
        }
    }, [name]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-blue-500 text-white p-6">
            <div className="bg-white text-blue-700 p-8 rounded-lg shadow-lg text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">Pest Details: {name}</h1>

                {loadingPestDetails && <p>Loading pest details...</p>}
                {errorPestDetails && <p className="text-red-500">Error fetching pest details: {errorPestDetails.message}</p>}
                {pestDetails && (
                    <div className="my-4 text-left">
                        <h2 className="text-2xl font-semibold mb-4">Details and Solutions</h2>
                        <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                            {pestDetails.split('\n').map((detail, index) => (
                                <p key={index} className="mb-2">{detail}</p>
                            ))}
                        </div>
                    </div>
                )}

                {loadingVideos && <p>Loading YouTube videos...</p>}
                {errorVideos && <p className="text-red-500">Error fetching YouTube videos: {errorVideos.message}</p>}
                {videos.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Related Videos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.slice(0, 3).map((video, index) => (
                                <iframe
                                    key={index}
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${video.video_id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-md shadow-lg"
                                ></iframe>
                            ))}
                        </div>
                    </div>
                )}
                {videos.length === 0 && !loadingVideos && !errorVideos && (
                    <p>No YouTube videos found for '{name} pest'.</p>
                )}

                {loadingImages && <p>Loading images...</p>}
                {errorImages && <p className="text-red-500">Error fetching images: {errorImages.message}</p>}
                {images.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="bg-white p-2 rounded-md shadow-md">
                                    <a href={image.url} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={image.thumbnail}
                                            alt={image.title}
                                            className="rounded-md object-cover w-full h-48"
                                        />
                                    </a>
                                    <p className="mt-2 text-sm">{image.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PestDetailsPage;
