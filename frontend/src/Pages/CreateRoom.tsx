import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import shield from "../Images/shield.jpeg";

const Room = () => {
  const { gameReady, setRoom } = useContext(GlobalContext);
  // const [ready, setReady] = useState<boolean>(false);
  let roomID = "";
  for (let i = 0; i < 4; i++) {
    roomID += Math.floor(Math.random() * 9);
  }

  useEffect(() => {
    // if (gameReady) {
    //   setReady(true);
    // }
    setRoom(roomID);
  }, []);

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
        <div style={{ margin: "15% 0 0 0" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
            <u>Room Details</u>
          </h3>
          <p>
            Room ID : <b>{roomID}</b>
          </p>
        </div>
        <div>
          {gameReady ? (
            <button
              style={{ width: "20%" }}
              className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Start Game
            </button>
          ) : (
            <>
              <br />
              <h2>Ask other player to join with this room-ID</h2>
              <br />
              <h2>Waiting for players to join...</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
