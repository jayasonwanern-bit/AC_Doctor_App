import { useState, useEffect, useCallback } from 'react';

const useCountdown = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('stopped'); // 'running', 'stopped', 'finished'

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      setStatus('running');
      interval = setInterval(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (time === 0 && isActive) {
      setStatus('finished');
      setIsActive(false);
    } else {
      setStatus('stopped');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  // Start countdown
  const startCountdown = useCallback((duration) => {
    setTime(duration);
    setIsActive(true);
    setStatus('running');
  }, []);

  // Reset countdown
  const resetCountdown = useCallback(() => {
    setTime(0);
    setIsActive(false);
    setStatus('stopped');
  }, []);

  // Stop countdown
  const stopCountdown = useCallback(() => {
    setIsActive(false);
    setStatus('stopped');
  }, []);

  // Format MM:SS
  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }, []);

  return { time, isActive, status, startCountdown, resetCountdown, stopCountdown, formatTime };
};

export default useCountdown;
