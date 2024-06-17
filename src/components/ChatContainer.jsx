import React from 'react';
import Loading from './Loading';
import MarkdownComponent from './MarkdownComponent';
import { IoSend } from "react-icons/io5";
import { useStore } from '../store';

const ChatContainer = ({ messages, isLoading, prompt, handleSubmit, setPrompt, displayUsername, endRef, error }) => {

    const { conversations } = useStore();

    // ฟังก์ชันสำหรับแปลงข้อมูล
    const transformData = (data) => {
        return data.map(item => ({
            id: item._id,
            user: item.prompt,
            tml: item.response
        }));
    };

    const newArray = transformData(conversations);
    newArray.reverse()

    return (
        <div className='relative overflow-scroll'>
            <div className="mb-24 chat-container">
                <div className='chat chat-start'>
                    <div className="p-4 m-4 bg-gray-100 text-gray-500 shadow-md chat-bubble">
                        {/*  ปรับแต่งข้อความต้อนรับให้ฮา  ✨ */}
                        สวัสดีครับ! 👋 ยินดีที่ได้รู้จัก{' '}
                        <span className='font-bold text-primary'>{displayUsername()}</span> {' '}
                        แหม.. บอกเลยว่าวันนี้คุณดูดีมากกกก! 🤩  เหมือนเพิ่งผ่านวงจร  Machine Learning  มาใหม่ๆ เลย 😉
                        ผม{' '}
                        <span className='font-bold text-secondary'>TLM AI</span> สุดฮา
                        พร้อมแล้วที่จะมอบความรู้ด้านเทคโนโลยี การเขียนโปรแกรม และแน่นอน! มุขตลกสุดฮาแบบไม่มีใครเกิน!  🎉
                        ว่าแต่วันนี้มีอะไรให้ผมรับใช้ครับ?  🤖
                    </div>
                </div>

                {
                    newArray.map((e, i) => (
                        <div key={i}>
                            <div className="chat chat-end">
                                <div className="text-white chat-bubble chat-bubble-primary"><div className='text-gray-300'>{`[ประวัติบทสนทนาที่ ${i}]`}</div> {e.user}</div>
                            </div>
                            <div className="chat chat-start">
                                <div className="bg-gray-100 text-gray-500 shadow-md chat-bubble">
                                    <MarkdownComponent content={e.tml} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="flex items-center w-full justify-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <div className="mx-4">ข้อความล่าสุด</div>
                    <div className="flex-1 border-t border-gray-300"></div>
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
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#0e0e0f] fixed bottom-0 left-0 right-0 flex flex-col space-y-4 mx-3"
            >
                <div className="flex justify-center items-center">
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="dark:bg-[#1e1f20] my-4 py-3 px-2 w-full border rounded-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
            <div ref={endRef}></div>
            {isLoading && <Loading />}
        </div>
    );
};

export default ChatContainer;