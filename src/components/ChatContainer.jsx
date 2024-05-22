import React from 'react';
import Loading from './Loading';
import MarkdownComponent from './MarkdownComponent';
import { IoSend } from "react-icons/io5";

const ChatContainer = ({ messages, isLoading, prompt, handleSubmit, setPrompt, displayUsername, endRef, error }) => {
    return (
        <div className='relative overflow-scroll'>
            <div className="mb-24 chat-container">
                <div className='chat chat-start'>
                    <div className="p-4 m-4 bg-gray-100 text-gray-500 shadow-md chat-bubble">
                        สวัสดีครับ! ยินดีที่ได้รู้จัก{' '}
                        <span className='font-bold text-primary'>{displayUsername()}</span> คุณดูดีมีออร่า เหมือน error ในโค้ด
                        ที่ผมพยายามหาทั้งคืนยังไงยังงั้นเลยครับ! 😂 ผม{' '}
                        <span className='font-bold text-secondary'>TML1-Turbo AI</span> สุดฮาประจำ TouchmyLike Co., Ltd.
                        ที่นี่เพื่อมอบความรู้ด้านเทคโนโลยี การเขียนโปรแกรม และมุขตลกสุดฮาแบบไม่มีใครเกิน! 🔥
                        ว่าแต่วันนี้มีอะไรให้ผมรับใช้ครับ? อย่าลืมว่าผมอัปเดตข้อมูลล่าสุดปี 2024 แล้วนะ
                        บอกเลยว่าล้ำกว่านี้ก็...เส้นใยควอนตัมแล้วครับ! 😉
                    </div>
                </div>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat ${msg.tml ? 'chat-start' : 'chat-end'}`}>
                        {msg.user && <div className="text-white chat-bubble chat-bubble-primary">{msg.user}</div>}
                        {msg.tml && (
                            <div className="bg-gray-100 text-gray-500 shadow-md chat-bubble">
                                <MarkdownComponent content={msg.tml} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div ref={endRef}></div>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#1d232a] fixed bottom-0 left-0 right-0 flex flex-col space-y-4 mx-3"
            >
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
            {isLoading && <Loading />}
        </div>
    );
};

export default ChatContainer;