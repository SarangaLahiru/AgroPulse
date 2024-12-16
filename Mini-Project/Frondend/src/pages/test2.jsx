import axios from 'axios';
import React, { useState } from 'react';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setError(null);

        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
            headers: {
                'x-rapidapi-key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
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
            console.error('Error:', error);
            setError('Failed to get response from ChatGPT API');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Chat with GPT</h1>
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
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div>
                {messages.map((message, index) => (
                    <div key={index} className={message.role}>
                        <strong>{message.role === 'user' ? 'You' : 'Bot'}: </strong>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
