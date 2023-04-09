

import React, { useState } from "react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import cap from "./Components/cap.gif"
import { Game } from "./Pages/Game.jsx";
import Modal3 from "./Components/Modal3";




const App= () => {
  const [open,setOpen]=useState(false)
  const [result,setResult]=useState(false)
  return (
    <>
      <AllRoutes />
      <button onClick={()=>setOpen(true)}>open</button>
     <Modal3  open={open} onClose={()=>setOpen(false)} res={result} score1={50} score2={70} />
    </>
  )
}

export default App;