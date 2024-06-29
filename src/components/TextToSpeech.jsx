import React, { useState, useEffect } from 'react';

function TextToSpeech({ textToSpeak, isSpeaking }) {
    const [isLoading, setIsLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);

    const subscriptionKey = import.meta.env.VITE_SPEECH;
    const region = 'eastus';
    const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    useEffect(() => {
        // ตรวจสอบว่ามี textToSpeak และ isSpeaking เป็น true เท่านั้น
        if (isSpeaking && textToSpeak) {
            handleSpeak();
        }
    }, [textToSpeak, isSpeaking]);

    useEffect(() => {
        // เล่นเสียงเมื่อ audioUrl เปลี่ยนแปลงและไม่เป็น null
        if (audioUrl !== null) {
            const audio = new Audio(audioUrl);
            audio.onended = () => {
                // เมื่อเสียงจบ ให้ setAudioUrl เป็น null เพื่อให้พร้อมรับ URL ใหม่
                setAudioUrl(null);
            };
            audio.play().catch(error => {
                // จัดการข้อผิดพลาดในการเล่นเสียง (เช่น ผู้ใช้ยังไม่ได้ interact กับหน้าเว็บ)
                console.error("Error playing audio:", error);
            });
        }
    }, [audioUrl]); // เพิ่ม audioUrl ใน dependency array

    const handleSpeak = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-Type': 'application/ssml+xml',
                    'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
                    'User-Agent': 'YourAppName',
                },
                body: `<speak version='1.0' xml:lang='th-TH'>
               <voice xml:lang='th-TH' xml:gender='Female' name='th-TH-PremwadeeNeural'>
                 ${textToSpeak}
               </voice>
             </speak>`,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const blob = await response.blob();
            if (blob.type !== 'audio/mpeg') {
                throw new Error('Invalid audio format received.');
            }

            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default TextToSpeech;
