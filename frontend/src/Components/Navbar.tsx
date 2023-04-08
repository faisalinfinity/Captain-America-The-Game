import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ alignContent: "center", justifyContent: "space-evenly" }}>
      <Link to="/">Home</Link>
      <Link to="/join">Join Room</Link>
      <Link to="/create">Create Room</Link>
    </div>
  );
};

export default Navbar;
