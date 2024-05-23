import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionComponent = () => {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startListening = () => SpeechRecognition.startListening({ continuous: true });

    return (
        <div className="p-4 m-4 bg-gray-100 text-gray-500 shadow-md chat-bubble">
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechRecognitionComponent;
