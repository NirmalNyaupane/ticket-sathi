'use client'
import React, { useState, useEffect } from 'react';

interface Props {
    onCountDownComplete?: () => void;
    timer?: number
}


// Sets a countdown Component with 60 second as initial
function Countdown({ onCountDownComplete, timer }: Props) {
    const [seconds, setSeconds] = useState(timer ?? 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);

        if (seconds === 0) {
            onCountDownComplete && onCountDownComplete();
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [seconds]);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return <>{formattedSeconds}</>;
}

export default Countdown;
