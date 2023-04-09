
import React, { useRef, useEffect, useState } from "react";


import logo from './logo.svg';
import './App.css';
import Chat from './Components/Chat';


import cap from "./Components/cap.gif"
import { Game } from "./Pages/Game.jsx";



const App= () => {
  return (
    <div className="App">
      <h1>Rahul Kumar game</h1>
   
   <Game/>

     </div>
  )
  
}

export default App;