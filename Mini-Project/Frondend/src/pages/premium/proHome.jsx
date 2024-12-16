import React from 'react';
import { FaBug, FaCloudSun, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProHome() {
    const navigate = useNavigate();
    const handleForecastClick = () => {
        navigate('/Forcast')
        console.log('Forecast button clicked');
    };

    const handleIdentifyPestClick = () => {
        navigate('/detection')
        console.log('Identify Pest button clicked');
    };

    const handleReportPestClick = () => {
        console.log('Report Pest button clicked');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to ProHome</h1>
            <p className="text-xl mb-8">Explore pest forecasts and identify pests:</p>

            <div className="flex gap-8">
                {/* Forecast Button */}
                <button
                    onClick={handleForecastClick}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                    <FaCloudSun className="mr-3" />
                    Forecast
                </button>

                {/* Identify Pest Button */}
                <button
                    onClick={handleIdentifyPestClick}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                    <FaBug className="mr-3" />
                    Identify Pest
                </button>

                {/* Report Pest Button */}
                <button
                    onClick={handleReportPestClick}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                    <FaExclamationTriangle className="mr-3" />
                    Report Pest
                </button>
            </div>
        </div>
    );
}
