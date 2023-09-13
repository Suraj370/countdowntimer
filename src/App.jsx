import React, { useState } from "react";
import './app.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountDown from "./component/timepicker";

const App = () => {
  

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='app'>
      <CountDown/>
      </div>
        
     
      
    </LocalizationProvider>
    </>
  )
};

export default App;



