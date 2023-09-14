import React, { useState, useRef } from "react";
import { TimePicker } from "@mui/x-date-pickers";


const CountDown = () => {
  const [selectedTime, setselectedTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState("00:00:00")
  const intervalRef = useRef(null);
  const remainingTimeRef = useRef("00:00:00");

  function handleStart() {
    setStartTime(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      updateRemainingTime(now);
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  function updateRemainingTime(now) {
    if (selectedTime != null && startTime != null) {
      const remainingMilliseconds = Math.max(selectedTime - now, 0);
      const seconds = Math.floor(remainingMilliseconds / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      remainingTimeRef.current = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      // console.log(remainingTimeRef.current);
      setRemainingTime(remainingTimeRef.current)
      if(Date.now() >= selectedTime){
        handleStop();
      }
      

    } else {
      remainingTimeRef.current = "00:00:00";
    }
  }

  return (
    <>
      <TimePicker
        value={selectedTime}
        onChange={(newTime) => {
          setselectedTime(newTime);
        }}
        views={["hours", "minutes", "seconds"]}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <p>Selected Time: {selectedTime ? new Date(selectedTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : "00:00:00"}</p>
      <p>Start Time: {startTime ? new Date(startTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : "00:00:00" }</p>
      <p>Remaining Time: {remainingTime}</p>
    </>
  );
};

export default CountDown;
