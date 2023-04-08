import React, { useState } from "react";
import shield from "../Images/shield.jpeg";

const Room = () => {
  const [isCreated, setIsCreated] = useState<boolean>(true);

  return (
    <div
      style={{
        backgroundImage: `url(${shield})`,
        // backgroundSize: "",
        display: "flex",
        color: "white",
      }}
    >
      <div style={{ width: "50%" }}>
        <img
          src="https://w0.peakpx.com/wallpaper/524/109/HD-wallpaper-captain-america-2-action-captain-america-entertainment-fight-hero-movie-new.jpg"
          alt="logo"
          width={"67%"}
        />
      </div>

      <div style={{ width: "50%" }}>
        {isCreated ? (
          <div style={{ margin: "5% 0 0 50%" }}>
            <h3 style={{ fontWeight: "bold" }}>Room Details</h3>
          </div>
        ) : null}
        <div style={{ margin: "25% 0 0 0" }}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create or Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
