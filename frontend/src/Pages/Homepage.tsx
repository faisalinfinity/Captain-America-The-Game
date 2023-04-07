import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isShowing, serIsShowing] = useState(true);
  const navigate = useNavigate();
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += Math.floor(Math.random() * 9);
  }

  const handleJoin = () => {
    navigate("/room");
  };

  const handleCreate = () => {
    alert("Create room");
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundImage: "linear-gradient(to left,#0965c0,#c53a94)",
      }}
    >
      <div style={{ width: "50%" }}>
        <h2>IronMan</h2>
        <img
          src="https://i.pinimg.com/originals/71/fb/49/71fb497f79e3b43b6546dab4f284f966.jpg"
          alt="ironman"
          width={"80%"}
          style={{ opacity: 0.8 }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#45caff,#ff1b6b",
          width: "50%",
        }}
      >
        <p>Player ID: {id}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "25px",
            margin: "20% 0 0 20%",
            padding: "5%",
          }}
        >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            style={{
              padding: "10%",
              width: "60%",
              borderRadius: "10%",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleCreate}
          >
            Create Room
          </button>
          <button
            style={{
              padding: "10%",
              width: "60%",
              borderRadius: "10%",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleJoin}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
