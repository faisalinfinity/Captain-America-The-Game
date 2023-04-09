import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import shield from "../Images/shield.jpeg";

const Homepage = () => {
  // const [isShowing, setIsShowing] = useState<boolean>(false);
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

  //https://wallpapercave.com/wp/wp6008133.jpg
  //https://e1.pxfuel.com/desktop-wallpaper/848/502/desktop-wallpaper-captain-america-cartoon-captain-america.jpg
  //https://wallpaperaccess.com/full/1690644.jpg
  //https://w0.peakpx.com/wallpaper/524/109/HD-wallpaper-captain-america-2-action-captain-america-entertainment-fight-hero-movie-new.jpg
  //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpfS3YxlEzXji_MisUmOTLzFQCuF-8g5--w&usqp=CAU

  return (
    <>
      <div
        style={{
          maxHeight: "15%",
          backgroundImage: `url(${shield})`,
        }}
      >
        <p style={{ color: "white" }}>Player ID: {id}</p>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          Game Name
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "25px",
            padding: "5%",
          }}
        >
          <button
            className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            style={{
              // border: "1px solid blue",
              padding: "2%",
              width: "30%",
              margin: "0 0 0 50%",
              // backgroundColor: "",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleCreate}
          >
            Create Room
          </button>
          <button
            className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            style={{
              // border: "1px solid blue",
              padding: "2%",
              width: "30%",
              margin: "0 0 0 20%",
              // backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleJoin}
          >
            Join Room
          </button>
        </div>
      </div>

      <div
        style={{
          // display: "flex",
          backgroundImage: `url(${shield})`,
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
