import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {Stack} from "@mui/material"
import { useRef, useEffect } from "react";
import { Typography } from "@mui/material";


function App() {
  const [selectedTime, setselectedTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null)

  useEffect(() => {
    if(selectedTime){
   
        const millisecondsToTarget = new Date(selectedTime).getTime() - Date.now();
        const secondsToTarget = Math.floor(millisecondsToTarget / 1000); // Convert to seconds
        setTimeLeft(secondsToTarget);
  
        // Start the countdown timer
        intervalRef.current = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            const newTimeLeft = prevTimeLeft - 1;
            if (newTimeLeft <= 0) {
              clearInterval(intervalRef.current);
            }
            return newTimeLeft;
          });
        }, 1000);
  
        // Clear the interval when timeLeft reaches 0 or component unmounts
        return () => clearInterval(intervalRef.current);
   
    }
  }, [selectedTime])
  const formatTimeLeft = (seconds) => {
    if (seconds <= 0) {
      return "Time's up!";
    }
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secondsRemaining = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secondsRemaining}s`;
  };

  return (
    <>
      <Stack spacing={3}>
        <TimePicker
          label="Time picker"
          value={selectedTime}
          onChange={(newValue) => setselectedTime(newValue)}
        />
        {timeLeft !== null && (
          <Typography>Countdown: {formatTimeLeft(timeLeft)}</Typography>
        )}
      </Stack>
    </>
  );
}

export default App;
