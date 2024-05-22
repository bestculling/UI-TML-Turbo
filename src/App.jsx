import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { useStore } from './store';
import "./App.css";
import Notification from './components/Notification';
import ChatContainer from './components/ChatContainer';

function App() {

    const [error, setError] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const { currentUser, conversations, setConversations } = useStore();
    const endRef = useRef(null);
    const endPoint = "https://beta-tml-turbo.onrender.com/";
    const dev = "http://localhost:3000/";

    useEffect(() => {
        if (currentUser && currentUser._id) {
            fetchConversations(currentUser._id);
        }
    }, [currentUser]);

    const fetchConversations = async (userId) => {
        try {
            const response = await fetch(endPoint + `api/conversations/${userId}`);
            const data = await response.json();
            setConversations(data);
        } catch (error) {
            setError(true);
            console.error('Error fetching conversations:', error);
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.length < 1) {
            return;
        }

        if (!currentUser || !currentUser._id) {  // ตรวจสอบว่า currentUser และ userId มีอยู่
            setError(true);
            console.error('User not authenticated');
            return;
        }

        setIsLoading(true);
        setPrompt('');
        setMessages([...messages, { user: prompt }]);

        function convertToFormattedString(conversations) {
            let result = "";

            for (let i = 0; i < conversations.length; i++) {
                const item = conversations[i];
                result += `ประโยคที่ ${i + 1}\n ข้อความของฉัน: ${item.prompt}\nข้อความของคุณ: ${item.response}\n`;
            }

            return result;
        }

        console.log("conversations ", conversations)
        const formattedString = convertToFormattedString(conversations);


        try {
            console.log("Prompt", `${prompt}\n ${formattedString}`)
            const apiResponse = await fetch(endPoint + 'api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `${formattedString}\n ${prompt}\n`,
                    single: prompt,
                    userId: currentUser._id
                }),
            });
            const data = await apiResponse.json();
            setResponse(data.response);
            setMessages([...messages, { user: prompt }, { tml: data.response }]);
        } catch (error) {
            setError(true);
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const displayUsername = () => {
        const username = currentUser.email;
        if (!username) {
            return <p>Loading username...</p>;
        }
        const regex = /^(.*?)@gmail.com$/;
        const match = username.match(regex);
        if (match) {
            return match[1];
        } else {
            return <p>Invalid email format</p>;
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-scroll">
            <Navbar />
            <div className="flex h-full overflow-scroll">
                <div className="flex-1">
                    <div className="container mx-auto p-4 h-full">
                        {currentUser ? (
                            <ChatContainer
                                messages={messages}
                                isLoading={isLoading}
                                prompt={prompt}
                                handleSubmit={handleSubmit}
                                setPrompt={setPrompt}
                                displayUsername={displayUsername}
                                endRef={endRef}
                                error={error}
                            />
                        ) : (
                            <Login />
                        )}
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}

export default App;
