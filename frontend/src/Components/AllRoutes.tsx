import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import CreateRoom from "../Pages/CreateRoom";
import Chat from "./Chat";
import JoinRoom from "../Pages/JoinRoom";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/create" element={<CreateRoom />}></Route>
        <Route path="/join" element={<JoinRoom />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
