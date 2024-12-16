// PaymentPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission logic here
        console.log('Payment details:', { cardNumber, expiryDate, cvv, name });
        alert('Payment successful!');
        navigate('/proHome')
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-600 p-6">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg  ease-in-out">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Upgrade to Premiere Plan</h1>
                <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6 flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name on Card</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 w-full transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
