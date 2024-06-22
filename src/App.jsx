import React, { useState, useRef, useEffect } from 'react';
import { useStore } from './store';
import "./App.css";
import ChatContainer from './components/ChatContainer';
import { getApiUrl } from './lib/utils'
import Layout from './components/Layout';

function App() {
    const [error, setError] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showImage, setShowImage] = useState(false)
    const { currentUser, conversations, setConversations } = useStore();
    const [base64Image, setBase64Image] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        console.log("status: ", import.meta.env.MODE)
        console.log("api check: ", getApiUrl())
        if (currentUser && currentUser._id) {
            fetchConversations(currentUser._id);
        }
    }, []);

    const fetchConversations = async (userId) => {
        const url = `${getApiUrl()}api/conversations/${userId}`
        try {
            const response = await fetch(url);
            const data = await response.json();
            setConversations(data);
        } catch (error) {
            setError('เกิดข้อผิดพลาดในการดึงข้อมูลการสนทนา');
            console.error('Error fetching conversations:', error);
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() === '') {
            setError('กรุณาพิมพ์ข้อความ');
            return;
        }

        if (prompt.includes('@image')) {
            const parts = prompt.split("@image");
            const result = parts.slice(1).join('');
            setResponse("แสดงผลรูปภาพ");
            setMessages([...messages, { user: prompt }, { tml: result }]);
            setPrompt('');
            return
        }

        if (!currentUser || !currentUser._id) {
            setError('กรุณาเข้าสู่ระบบ');
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessages([...messages, { user: prompt }]);
        setPrompt('');

        try {
            const finalPrompt = prompt
            const url = base64Image === '' ? `${getApiUrl()}api/newGenerate` : `${getApiUrl()}api/newGenerateTextFromImage`

            const formData = new FormData();
            formData.append('prompt', finalPrompt);
            formData.append('userId', currentUser._id);
            formData.append('image', base64Image);

            const apiResponse = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (!apiResponse.ok) {
                throw new Error(`HTTP error! status: ${apiResponse.status}`);
            }

            const data = await apiResponse.json();
            setResponse(data.response);
            setMessages([...messages, { user: prompt }, { tml: data.response }]);
            setBase64Image('')

        } catch (error) {
            console.error('Error fetching data:', error);
            setMessages([...messages, { user: prompt }, { tml: "เกิดข้อผิดพลาดขณะประมวลผลคำขอของคุณ กรุณาลองใหม่อีกครั้ง" }]);
        } finally {
            setIsLoading(false);
        }
    };


    const displayUsername = () => {
        const name = currentUser?.name;
        if (!name) {
            return <p>กำลังโหลดชื่อผู้ใช้...</p>;
        } else {
            return name
        }
    };

    return (
        <Layout>
            <ChatContainer
                messages={messages}
                isLoading={isLoading}
                prompt={prompt}
                handleSubmit={handleSubmit}
                setPrompt={setPrompt}
                displayUsername={displayUsername}
                endRef={endRef}
                error={error}
                setShowImage={setShowImage}
                base64Image={base64Image}
                setBase64Image={setBase64Image}
            />
        </Layout>
    );
}

export default App;