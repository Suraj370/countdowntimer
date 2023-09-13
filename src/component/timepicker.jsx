import React, { useState, useRef } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";

const CountDown = () => {
  const [selectedTime, setselectedTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(null);
  const [start, setStart] = useState(false)
  const timerRef = useRef();


  const startTimer = () => {
    
      const timer = setInterval(() => {
        setCurrentTime(new Date());
        setRemainingTime(selectedTime - new Date());
      }, 1000);

      setStart(true)

      timerRef.current = timer;
      return () => {
        clearInterval(timerRef.current);
      };
    
  };
  const stopTimer = () => {setStart(false)}



  return (
    <>
      <TimePicker
        value={selectedTime}
        onChange={(newTime) => {
          setselectedTime(newTime);
          setRemainingTime(new Date() - newTime);
        }}
        views={["hours", "minutes", "seconds"]}
      />
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}> Stop</button>
      <p>SelectedTime : {selectedTime && start ? selectedTime.toString() : "00:00:00"}</p>
      <p>CurrentTime : {currentTime && start? currentTime.toString() : "00:00:00" }</p>
      <p>Remaining Time: {remainingTime && start? remainingTime : "00:00:00"}</p>
    </>
  );
};

export default CountDown;
