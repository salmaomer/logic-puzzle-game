import React, { useEffect, useState } from 'react';
import '../css/InformationGame.css';

export default function Timer({ duration, onTimeUp }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="timer">
      <h4>⏱️ Timer: {formatTime(time)}</h4>
    </div>
  );
}
