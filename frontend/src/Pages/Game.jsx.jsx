import React, { useCallback, useEffect, useRef, useState } from "react";
import cap from "../Images/cap.gif";
import "./js.css";
import lost from "../Images/lost.png";
import fire from "../Images/fire.gif";
import capst from "../Images/capst.png";
import jump from "../Images/jump.png";
import Chat from "../Components/Chat";
import { GlobalContext } from "../Context/GlobalContext";
import capst1 from "../Images/cap-st.png";
import lostimg from "../Images/lostimg.png";
import lost1 from "../Images/imgd.png";
import cap1 from "../Images/cap1.webp";
import back1 from "../Images/giphy.webp";
import gif from "../Images/gif-still.jpg";
import ScoreCard from "../Components/ScoreCard";

export const Game = () => {
  const [chat,setChat]=useState(false)
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [end,setEnd]=useState(true)
  const [isColliding, setIsColliding] = useState(false);
  const scoreRef=useRef()
  let id;
  const {
    value,
    setValue,
    gameReady,
    scores,
    setScores,
    setp2Scores,
    setRoom,
    setOver,
    p2Scores,
    handleRoom,
    messages,
    sendMessage,
    room,
    sendScores,
    socketRef,
  } = React.useContext(GlobalContext);
  const [col, setCol] = useState(false);
const [p2,setp2]=useState(0)
  const timerref = useRef(null);

  const [marginB, setMarginB] = useState(chat ? "100px" : "200px");
  const [marginL, setMarginL] = useState(100);

  const [dis, setDis] = useState(0);
  const [dis1, setDis1] = useState(0);

  const [imgSrc, setImgSrc] = useState(capst1);
  const rect1 = div1Ref.current?.getBoundingClientRect();
  const rect2 = div2Ref.current?.getBoundingClientRect();

  const [down1, setDown] = useState(0);

  const img = useRef();
  const [back,setback]=useState(gif)

  useEffect(() => {
    const checkCollision = () => {
      const div1 = div1Ref.current?.getBoundingClientRect();
      const div2 = div2Ref.current?.getBoundingClientRect();
      const isOverlap = !(
        div1?.right < div2?.left ||
        div1?.left > div2?.right ||
        div1?.bottom < div2?.top ||
        div1?.top > div2?.bottom
      );

      // console.log("h")
      setIsColliding(isOverlap);
      if (isOverlap) {
       
        setAnim("");
        // alert("Collision detected!");
      }
      if (isOverlap) {
        //  return;
        if(img.current){
          img.current.src = lost1;
        }
      
        setback(gif)
        console.log(end)
        setEnd(false)
        setOver(true)
      }
    };
    //checkCollision();
    const intervalId = setInterval(checkCollision, 16); // check collision every 16ms
    return () => clearInterval(intervalId);
  }, []);

  var keys = [];

  const marginRef = useRef();

  function update() {
    if (keys[38]) {
      if (div1Ref.current) {
        div1Ref.current.style.marginTop = "-290px";
        img.current.src = jump;
      }
    } 

    if(!keys[38]){
      const downInterval = setTimeout(down, 1000);
    }
      // setMarginB("0px")
      
      //  return ()=>clearTimeout(downInterval)
    // down()
    

    function down() {
      if (div1Ref.current) {
        // console.log(chat)
        div1Ref.current.style.marginTop = chat ? "100px" : "200px";
        img.current.src = cap;
      }
    }
  }

  function draw() {}

  document.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
    loop();
  });

  document.addEventListener("keyup", function (event) {
    keys[event.keyCode] = false;

    loop();
  });

  function loop() {
    update();
    draw();
  }

  const [anim, setAnim] = useState("");

  function Onstart() {
    setback(back1);
    setImgSrc(cap);
    setAnim("mymove 10s infinite");
    IncreaseScore();
  }

  const IncreaseScore = () => {
    let i = 0;
    id = setInterval(() => {
      if (scoreRef.current) {
        scoreRef.current.innerText = i;
      }

      if (i !== 0) {
        localStorage.setItem("score1", i);
        sendScores(i);
      }
      i++;
    }, 1000);
    console.log(end);
    if (!end) {
      clearInterval(id);
      return;
    }
  };
  const handleReceiveScores = (data) => {
    setp2(data.scores);
    setp2Scores(data.scores);
    if (data.scores !== 0) {
      localStorage.setItem("score2", data.scores);
    }
  };

  return (
    <div>
      <div
        style={{
          // display: "flex",
          backgroundImage: `url(https://cdn.pixabay.com/photo/2018/08/23/07/35/thunderstorm-3625405_960_720.jpg )`,
          backgroundSize: "cover",
          opacity: 0.9,
        }}
        className="h-auto w-full mx-auto p-4 rounded-t-lg bg-gray-100 shadow-lg "
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">
            Player 1: <span ref={scoreRef}>0</span>
          </h2>
          <h2 className="text-lg font-bold text-white">Player 2:{p2Scores}</h2>
        </div>
        <div className="flex justify-center gap-10 mb-4">
          <button
            onClick={() => {
              Onstart();
            }}
            className="px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Start Game
          </button>
          <button
            onClick={() => {
              setChat(!chat);
            }}
            className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Chats
          </button>
        </div>
      </div>
      <div className="flex justify-between" style={{ marginTop: "0px" }}>
        <div
          id="game-main"
          style={{
            backgroundImage: `url(${back})`,
            height: chat ? "400px" : "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "400px",
            }}
          >
            <div
              style={{
                width: "8%",
                height: "100px",
                marginLeft: `${marginL}px`,
                marginTop: marginB,
                border: "0px solid",
              }}
              id="div5"
              ref={div1Ref}
            >
              <img ref={img} width="120%" src={imgSrc} alt="" />
            </div>
            <div
              style={{
                width: "5%",
                animation: anim,
                position: "relative",
                height: "70px",
                marginTop: chat ? "180px" : "260px",
                border: "0px solid",
              }}
              ref={div2Ref}
            >
              <img width="120%" src={fire} alt="" />
            </div>
          </div>
          {/* <button onClick={Onstart}>Start Game</button> */}
          {/* fixed */}
        </div>

        <Chat chat={chat} />
      </div>
      <div
        style={{
          // display: "flex",
          backgroundImage: `url(https://media.tenor.com/phzTPEhdWXMAAAAC/avengers-captain-america.gif)`,
          backgroundSize: "cover",
          opacity: 0.9,
          height: "80px",
        }}
        className="text-4xl text-center font-bold  "
      >
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
        <p className="text-xl text-center text-gray-500 animate-pulse ">
          Press ↑ key to jump{" "}
        </p>
      </div>
    </div>
  );
};
