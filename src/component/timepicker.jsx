import React, { useState, useRef } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";

const CountDown = () => {
  const [selectedTime, setselectedTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }
  let hoursDifference = 0;
  if (selectedTime != null && startTime != null) {
    hoursDifference = Math.abs((selectedTime - startTime) / (1000 * 60 * 60)); // Calculate the hours difference
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
      <button onClick={handleStop}> Stop</button>
      <p>SelectedTime : {selectedTime && now ? new Date(selectedTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : "00:00:00"}</p>
      <p>StartTime : {startTime && now ? new Date(startTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : "00:00:00" }</p>
      <p>Remaining Time:  {selectedTime && now ? new Date(selectedTime - secondsPassed * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : "00:00:00"}</p>
      <p>Hours Difference: {selectedTime && now ? new Date(hoursDifference).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 0}</p>
    </>
  );
};

export default CountDown;
