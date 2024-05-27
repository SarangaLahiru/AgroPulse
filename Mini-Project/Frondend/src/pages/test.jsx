import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Test = () => {
    const [speechData, setSpeechData] = useState(null);
    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'POST',
                url: 'https://large-text-to-speech.p.rapidapi.com/tts',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                    'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
                },
                data: {
                    text: 'Perfection'
                }
            };

            try {
                const response = await axios.request(options);
                setSpeechData(response.data);
                setAudioSrc(response.data.audio_url);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div>
            <h1>Text to Speech</h1>
            {speechData && (
                <div>
                    <p>{speechData.text}</p>
                    <p>Status: {speechData.status}</p>
                    <p>ETA: {speechData.eta}</p>
                    {audioSrc && <audio controls src={audioSrc} />}
                </div>
            )}
        </div>
    );
};

export default Test;
