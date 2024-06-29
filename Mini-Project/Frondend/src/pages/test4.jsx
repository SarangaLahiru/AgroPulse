import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LocationTracker = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await getCurrentPosition();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null);

                // Fetch city and country details using Google Maps Geocoding API
                const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
                const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

                const { data } = await axios.get(apiUrl);

                if (data.results.length > 0) {
                    const addressComponents = data.results[0].address_components;
                    const city = findAddressComponent(addressComponents, 'locality');
                    const country = findAddressComponent(addressComponents, 'country');

                    setCity(city);
                    setCountry(country);
                } else {
                    setError('Location details not found.');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        getLocation();

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null);
            },
            (err) => {
                setError(err.message);
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [latitude, longitude]); // Dependencies: latitude and longitude to update on change

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
            <h2>Real-time Location Tracker</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                    <p>City: {city}</p>
                    <p>Country: {country}</p>
                </div>
            )}
        </div>
    );
};

export default LocationTracker;
