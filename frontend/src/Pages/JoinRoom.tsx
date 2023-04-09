import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import shield from "../Images/shield.jpeg";

const JoinRoom = () => {
  const [roomID, setRoomID] = useState<string>("");
  const { setRoom, gameReady } = useContext(GlobalContext);

  if (roomID.length == 4) {
    setRoom(roomID);
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${shield})`,
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

        <div style={{ margin: "15% 0 0 0", color: "black" }}>
          <input
            type="text"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            placeholder="enter room-ID"
          />
          <button className="bg-blue-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full">
            Join Room
          </button>
          <br />
          <br />
          {gameReady ? (
            <>
              <button
                style={{ width: "100%" }}
                className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Start Game
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
