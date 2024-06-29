import React from 'react';
import { useNavigate } from 'react-router-dom';
import './premium.css'; // Assuming you have a CSS file for styling

const PremiumPlans = () => {
    const navigate = useNavigate();
    return (
        <div className="premium-plans-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan 1 */}
                <div className="plan-card bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Basic Plan</h3>
                    <p className="text-gray-700 mb-4">Ideal for small farms</p>
                    <p className="text-2xl font-bold text-gray-800 mb-4">$0.00/month</p>
                    <ul className="text-sm text-gray-600 mb-4">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Pest forecasts
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Credit : 10
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Basic customer support
                        </li>
                    </ul>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                        Choose Basic
                    </button>
                </div>

                {/* Plan 2 */}
                <div className="plan-card bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Standard Plan</h3>
                    <p className="text-gray-700 mb-4">Great for medium-sized farms</p>
                    <p className="text-2xl font-bold text-gray-800 mb-4">$39.99/month</p>
                    <ul className="text-sm text-gray-600 mb-4">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Advanced pest analysis
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Crop health reports
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Priority support
                        </li>
                    </ul>
                    <button onClick={() => { navigate('/payment') }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Choose Standard
                    </button>
                </div>

                {/* Plan 3 */}
                <div className="plan-card bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Premium Plan</h3>
                    <p className="text-gray-700 mb-4">Best for large farms</p>
                    <p className="text-2xl font-bold text-gray-800 mb-4">$59.99/month</p>
                    <ul className="text-sm text-gray-600 mb-4">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Precision pest management
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            Real-time pest tracking
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                            </svg>
                            24/7 premium support
                        </li>
                    </ul>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                        Choose Premium
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumPlans;

