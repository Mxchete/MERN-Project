import React, { createContext, useState, useEffect } from 'react';

export const AudioContextState = createContext();

export const AudioProvider = ({ children }) => {
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    const handleStartAudioContext = () => {
        if (!audioContext) {
            // Create the AudioContext and AnalyserNode here
            const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            const newAnalyser = newAudioContext.createAnalyser();
            // Configure your analyser here (fftSize, smoothingTimeConstant, etc.)
            setAudioContext(newAudioContext);
            setAnalyser(newAnalyser);
            newAudioContext.resume(); // Since this is in response to a user action, it should work
        } else if (audioContext.state === 'suspended') {
            audioContext.resume(); // Resume if already existing but suspended
        }
    };    

    // Pass audioContext, analyser, and handleStartAudioContext down through the context
    return (
        <AudioContextState.Provider value={{ audioContext, analyser, handleStartAudioContext }}>
            {children}
        </AudioContextState.Provider>
    );
};
