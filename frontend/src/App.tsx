

import React, { useState } from "react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import cap from "./Components/cap.gif"
import { Game } from "./Pages/Game.jsx";




const App= () => {
  const [open,setOpen]=useState(false)
  const [result,setResult]=useState(false)
  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App;