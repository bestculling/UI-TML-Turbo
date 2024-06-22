import React, { useState, useRef } from 'react';
import Loading from './Loading';
import MarkdownComponent from './MarkdownComponent';
import { IoSend } from "react-icons/io5";
import { useStore } from '../store';
import { FiPlusCircle } from "react-icons/fi";
import TextToSpeech from './TextToSpeech';
import './Chat.css'


const ChatContainer = ({ messages, isLoading, prompt, handleSubmit, setPrompt, displayUsername, endRef, base64Image, setBase64Image }) => {

    const { conversations } = useStore();

    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const fileInputRef = useRef(null);
    const [showImage, setShowImage] = useState(null)

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        setIsLoadingImage(true); // เริ่ม animation เมื่อเริ่มอัปโหลด
        setBase64Image(file);
        setIsLoadingImage(false); // หยุด animation เมื่ออัปโหลดเสร็จ
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShowImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // เรียกการคลิกที่ input file ที่ซ่อนอยู่
    };

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState(null);
    const [currentAudioUrl, setCurrentAudioUrl] = useState(null); // เพิ่ม state setCurrentAudioUrl
    const [audioRef, setAudioRef] = useState(null); // สร้าง state audioRef

    const handleSpeakClick = (index) => {
        setCurrentSpeakingIndex(index);
        setIsSpeaking(true);

        // หยุดเสียงเดิมก่อนเล่นเสียงใหม่
        if (audioRef) {
            audioRef.pause();
            audioRef.currentTime = 0;
        }
    };

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
                    <div key={index}
                        className={`chat ${msg.tml ? 'chat-start' : 'chat-end'} ${index === currentSpeakingIndex ? 'message-speaking' : ''}`}
                        onClick={() => handleSpeakClick(index)}>
                        {msg.user && <div className="text-white chat-bubble chat-bubble-primary overflow-scroll">{msg.user}</div>}
                        {msg.tml && (
                            <div className="bg-gray-100 text-gray-500 shadow-md chat-bubble">
                                {
                                    msg.tml.includes('http') ? (
                                        <div className='w-fll'>
                                            <img className='rounded-md' src={msg.tml} />
                                        </div>)
                                        : (
                                            <MarkdownComponent content={msg.tml} />
                                        )
                                }
                            </div>
                        )}
                    </div>
                ))}
                <TextToSpeech
                    textToSpeak={currentSpeakingIndex !== null ? messages[currentSpeakingIndex].tml : ''}
                    isSpeaking={isSpeaking}
                    onAudioUrlChange={setCurrentAudioUrl}
                />

                {/* สร้าง audio element */}
                <audio ref={ref => setAudioRef(ref)} src={currentAudioUrl} controls autoPlay className='hidden' />
                {isLoadingImage && (
                    <div className="flex items-center justify-center h-12 w-12 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
                )}
                {!isLoadingImage && base64Image && (
                    <div className='chat chat-end'>
                        <div className="text-white chat-bubble chat-bubble-primary overflow-scroll">
                            <img src={showImage} alt="Upload success" />
                        </div>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#0e0e0f] fixed bottom-0 left-0 right-0 flex flex-col space-y-4 mx-3"
            >
                <div className="flex items-center">
                    <div className='flex flex-1 mr-2'>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="dark:bg-[#1e1f20] my-4 py-3 px-2 w-full border rounded-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder='Aa'
                            rows="1"
                        />
                    </div>
                    <div className='flex flex-0 gap-3'>
                        <button onClick={handleButtonClick} className="btn btn-active dark:bg-blue-500 dark:text-white">
                            <FiPlusCircle className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden" // ซ่อน input file
                        />
                        <button
                            type="submit"
                            className="dark:bg-blue-500 dark:text-white btn btn-active btn-neutral"
                            disabled={isLoading}
                        >
                            <IoSend />
                        </button>
                    </div>
                </div>
            </form>
            <div ref={endRef}></div>
            {isLoading && <Loading />}
        </div>
    );
};

export default ChatContainer;