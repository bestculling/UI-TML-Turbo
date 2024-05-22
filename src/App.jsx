// App.js
import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import Navbar from './components/Navbar';
import Login from './components/Login';
import { useStore } from './store';
import "./App.css";
import Loading from './components/Loading';
import Notification from './components/Notification';
import MarkdownComponent from './components/MarkdownComponent';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.length < 1) {
      return
    }
    setIsLoading(true);
    setPrompt('');
    setMessages([...messages, { user: prompt }]);
    try {
      const apiResponse = await fetch('https://beta-tml-turbo.onrender.com/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await apiResponse.json();
      setResponse(data.response);
      setMessages([...messages, { user: prompt }, { tml: data.response }]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayUsername = () => {
    const username = currentUser.email
    if (!username) {
      return <p>Loading username...</p>;
    }

    const regex = /^(.*?)@gmail.com$/;
    const match = username.match(regex);

    if (match) {
      return match[1]
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
            {
              currentUser ? (
                <div className='relative overflow-scroll'>
                  <div className="mb-24 chat-container">
                    <div className='chat chat-start'>
                      <div className="p-4 m-4 bg-gray-100 text-gray-500 shadow-md chat-bubble">สวัสดีครับ! ยินดีที่ได้รู้จัก <span className='font-bold text-primary'>{displayUsername()}</span> คุณดูดีมีออร่า เหมือน error ในโค้ด ที่ผมพยายามหาทั้งคืนยังไงยังงั้นเลยครับ! 😂

                        ผม <span className='font-bold text-secondary'>TML1-Turbo AI</span> สุดฮาประจำ TouchmyLike Co., Ltd. ที่นี่เพื่อมอบความรู้ด้านเทคโนโลยี การเขียนโปรแกรม และมุขตลกสุดฮาแบบไม่มีใครเกิน! 🔥

                        ว่าแต่วันนี้มีอะไรให้ผมรับใช้ครับ? อย่าลืมว่าผมอัปเดตข้อมูลล่าสุดปี 2024 แล้วนะ บอกเลยว่าล้ำกว่านี้ก็...เส้นใยควอนตัมแล้วครับ! 😉</div>
                    </div>
                    {messages.map((msg, index) => (
                      <div key={index} className={`chat ${msg.tml ? 'chat-start' : 'chat-end'}`}>
                        {msg.user && <div className="text-white chat-bubble chat-bubble-primary">{msg.user}</div>}
                        {msg.tml && (
                          <div className="bg-gray-100 text-gray-500 shadow-md chat-bubble">
                            {msg.tml.length < 1 ? (
                              <div className="text-red-500">ขอโทษครับ เนื่องจาก Server! มีปัญหา ลองส่งข้อความมาใหม่อีกรอบ...</div>
                            ) : (
                              <MarkdownComponent content={msg.tml} />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div ref={endRef}></div>
                  <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1d232a] fixed bottom-0 left-0 right-0 flex flex-col space-y-4 mx-3">
                    <div className="flex justify-center items-center">
                      <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="dark:bg-[#1d232a] my-4 py-3 px-2 w-full border rounded-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder='Aa'
                        rows="1"
                      />
                      <button
                        type="submit"
                        className="dark:bg-blue-500 dark:text-white mx-5 btn btn-active btn-neutral"
                        disabled={isLoading}
                      >
                        <IoSend />
                      </button>
                    </div>
                  </form>

                  {isLoading && (
                    <Loading />
                  )}
                </div>
              ) : (<Login />)
            }
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}

export default App;
