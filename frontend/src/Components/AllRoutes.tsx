import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Room from "../Pages/Room";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/room" element={<Room />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
