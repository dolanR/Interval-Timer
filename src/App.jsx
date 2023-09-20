import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState('Session');
  const audioRef = useRef(null);

  useEffect(() => {
     if (timeLeft === 0) {
      switchTimer();
       };
    }, [timeLeft]);

  useEffect(() => {
    let interval;

    if (timerRunning) {

      interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);
  
  const playAudio = () => {
    audioRef.current.play();
  };

  const invertTimer = () => {
    setTimerRunning(prev => !prev);
  };

  const switchTimer = () => {
    if (timerType === 'Session') {
      playAudio();
      setTimerType('Break');
      setTimeLeft(breakLength * 60);
    } else {
      playAudio();
      setTimerType('Session');
      setTimeLeft(sessionLength * 60);
    }
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(prev => prev + 1);
      if(timerType === 'Break') {
        setTimeLeft((breakLength + 1) * 60);
      }
    }
  }
  
  const decrementBreak = () => { 
    if (breakLength > 1) {
      setBreakLength(prev => prev - 1);
      if(timerType === 'Break') {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  }
  
  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(prev => prev + 1);
      if (timerType === 'Session') {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  }

  const decrementSession = () => { 
    if (sessionLength > 1) {
      setSessionLength(prev => prev - 1);
      if (timerType === 'Session') {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  }

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    setTimerType('Session');
  }
  return (
    <>
      <audio ref={audioRef} id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      <h1>Interval Timer</h1>
      <div className="flex" id="labelContainer">
        <div id="break-label" className='flex'>
          <h2>Break Length</h2>
          <div id='break-controller' className='flex'>
            <button id='break-decrement' onClick={() => !timerRunning && decrementBreak()}>
            <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <p id='break-length'>{breakLength}</p>
            <button id='break-increment' onClick={() => !timerRunning && incrementBreak()}>
            <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
        </div>
        <div id="session-label" className='flex'>
          <h2>Session Length</h2>
          <div id='session-controller' className='flex'>
            <button id='session-decrement' onClick={() => !timerRunning && decrementSession()}>
            <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <p id='session-length'>{sessionLength}</p>
            <button id='session-increment' onClick={() => !timerRunning && incrementSession()}>
            <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="timer-container" className='flex'>
        <h2 id="timer-label">{timerType}</h2>
        <p id="time-left">{formatTime(timeLeft)}</p>
      </div>
      <div id='timer-controller' className='flex'>
        <button id='start_stop' onClick={() => invertTimer()}>
        <i className="fa fa-play fa-2x"></i>
        <i className="fa fa-pause fa-2x"></i>
        </button>
        <button id='reset' onClick={() => reset()}>
        <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
    </>
  )
}

export default App
