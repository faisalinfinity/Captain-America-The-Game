import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import shield from "../Images/shield.jpeg";
const avengers = require("./avengers.mp3");

const Homepage = () => {
  // const [isShowing, setIsShowing] = useState<boolean>(false);
  const [audio] = useState(new Audio(avengers));
  const [start, setStart] = useState(false);
  const [mute, setMute] = useState(false);
  const navigate = useNavigate();
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += Math.floor(Math.random() * 9);
  }

  const handleJoin = () => {
    navigate("/join");
  };

  const handleCreate = () => {
    navigate("/create");
  };

  useEffect(() => {
    if (mute) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [mute]);

  useEffect(()=>{
    localStorage.setItem("single","false")
  },[])
  return (
    <>
      <div
        // className="bg-gradient-to-br  from-red-700 to-blue-700"
        style={{
          // display: "flex",
          backgroundImage: `url(https://i.postimg.cc/qMvBDyYg/image.png)`,
          backgroundSize: "cover",
          opacity: 0.9,
        }}
      >
        <div style={{ width: "100%" }} className="flex w-full justify-betwwen">
          <img
            onClick={() => setMute(!mute)}
            style={{ width: "1%", margin: "5px" }}
            src={
              mute
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3spn1mMKAqJtg2klnEtjjEAbWEvMFALgJIvEabQe8Eg&usqp=CAU&ec=48600113"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDC0uRc1figBaRvLDZOvtbIqLnp0KkxtVxN_t8Nm3HIg&usqp=CAU&ec=48600113"
            }
            alt="Hello"
          />
        </div>

        <div className="text-4xl text-center font-bold">
          <span className="text-blue-600 animate-pulse">C</span>
          <span className="text-blue-600 animate-pulse">a</span>
          <span className="text-blue-600 animate-pulse">p</span>
          <span className="text-blue-600 animate-pulse">t</span>
          <span className="text-blue-600 animate-pulse">a</span>
          <span className="text-blue-600 animate-pulse">i</span>
          <span className="text-blue-600 animate-pulse">n</span>
          <span className="text-red-600 animate-pulse">A</span>
          <span className="text-red-600 animate-pulse">m</span>
          <span className="text-red-600 animate-pulse">er</span>
          <span className="text-red-600 animate-pulse">i</span>
          <span className="text-red-600 animate-pulse">ca</span>
          <br />
          <p className="text-xl text-center text-white ">
            A Multiplayer Game with Realtime Chat and Scores
          </p>
        </div>
        <br />
        <br />
        {start ? (
          <div
            style={{
              margin: "auto",
              width: "50%",
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20%",
              padding: "1%",
            }}
          >
            <button
              className="bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full"
              style={{
                padding: "2%",
                cursor: "pointer",
              }}
              onClick={handleCreate}
            >
              Create Room
            </button>
            <button
              className="bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full"
              style={{
                padding: "2%",
                cursor: "pointer",
              }}
              onClick={handleJoin}
            >
              Join Room
            </button>
            <button
              className="bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-full"
              style={{
                padding: "2%",
                cursor: "pointer",
              }}
              onClick={() =>{
                navigate("/game")
                localStorage.setItem("single","true")
              }}
            >
              Single Player
            </button>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="bg-black text-white hover:bg-white hover:text-black p-3 rounded-full"
              style={{

                width: "10%",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                audio.play();
                setStart(true);
              }}
            >
              Start
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          // display: "flex",
          backgroundImage: `url(https://media.tenor.com/phzTPEhdWXMAAAAC/avengers-captain-america.gif)`,
          backgroundSize: "cover",
          opacity: 0.9,
        }}
      >
        <img
          src="https://w0.peakpx.com/wallpaper/524/109/HD-wallpaper-captain-america-2-action-captain-america-entertainment-fight-hero-movie-new.jpg"
          alt="logo"
          width={"22%"}
        />
      </div>
    </>
    // {/* <img
    //   src="https://wallpapercave.com/wp/wp6008133.jpg"
    //   alt="logo"
    //   width={"25%"}
    // />
    // <img
    //   src="https://e1.pxfuel.com/desktop-wallpaper/848/502/desktop-wallpaper-captain-america-cartoon-captain-america.jpg"
    //   alt="logo"
    //   width={"25%"}
    // />
    // <img
    //   src="https://wallpaperaccess.com/full/1690644.jpg"
    //   alt="logo"
    //   width={"25%"}
    // /> */}

    // <div
    //   style={{
    //     display: "flex",
    //     backgroundImage: "linear-gradient(to left,#0965c0,#c53a94)",
    //   }}
    // >
    //   <div style={{ width: "50%" }}>
    //     <h2 style={{ textAlign: "center", fontSize: "50px" }}>IronMan</h2>
    //     <img
    //       src="https://i.pinimg.com/originals/71/fb/49/71fb497f79e3b43b6546dab4f284f966.jpg"
    //       alt="ironman"
    //       width={"80%"}
    //       style={{ opacity: 0.8 }}
    //     />
    //   </div>

    //   <div
    //     style={{
    //       backgroundColor: "#45caff,#ff1b6b",
    //       width: "50%",
    //     }}
    //   >
    //     <p>Player ID: {id}</p>
    //     <div
    //       style={{
    //         display: "grid",
    //         gridTemplateColumns: "repeat(2,1fr)",
    //         gap: "25px",
    //         margin: "20% 0 0 20%",
    //         padding: "5%",
    //       }}
    //     >
    //       <button
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    //         style={{
    //           padding: "10%",
    //           width: "60%",
    //           borderRadius: "10%",
    //           backgroundColor: "transparent",
    //           color: "white",
    //           cursor: "pointer",
    //         }}
    //         onClick={handleCreate}
    //       >
    //         Create Room
    //       </button>
    //       <button
    //         style={{
    //           padding: "10%",
    //           width: "60%",
    //           borderRadius: "10%",
    //           backgroundColor: "transparent",
    //           color: "white",
    //           cursor: "pointer",
    //         }}
    //         onClick={handleJoin}
    //       >
    //         Join Room
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Homepage;
