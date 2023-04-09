import React, { useCallback, useEffect, useRef, useState } from "react";
import cap from "../Images/cap.gif";
import "./js.css";
import lost from "../Images/lost.png";
import fire from "../Images/fire.gif";
import capst from "../Images/capst.png";
import jump from "../Images/jump.png";
import Chat from "../Components/Chat";
import { GlobalContext } from "../Context/GlobalContext";

export const Game = () => {
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
    p2Scores,
    handleRoom,
    messages,
    sendMessage,
    room,
    sendScores,
    socket,
  } = React.useContext(GlobalContext);
  const [col, setCol] = useState(false);
const [p2,setp2]=useState(0)
  const timerref = useRef(null);

  const [marginB, setMarginB] = useState("0px");
  const [marginL, setMarginL] = useState(100);

  const [dis, setDis] = useState(0);
  const [dis1, setDis1] = useState(0);

  const [imgSrc, setImgSrc] = useState(capst);
  const rect1 = div1Ref.current?.getBoundingClientRect();
  const rect2 = div2Ref.current?.getBoundingClientRect();

  const [down1, setDown] = useState(0);

  const img = useRef();

  //   for (const key in div1Rect) {
  //     if (typeof div1Rect[key] !== "function") {
  //      // let para = document.createElement("img");
  //       if(key=="x"){
  //         setDis(key)
  //       }
  //      // para.src=cap;
  //     //  document.body.appendChild(para);
  //      // break;
  //     }
  //   }

  useEffect(() => {
    const checkCollision = () => {
      const div1 = div1Ref.current?.getBoundingClientRect();
      const div2 = div2Ref.current?.getBoundingClientRect();
      const isOverlap = !(
        div1.right < div2.left ||
        div1.left > div2.right ||
        div1.bottom < div2.top ||
        div1.top > div2.bottom
      );

      // console.log("h")
      setIsColliding(isOverlap);
      if (isOverlap) {
        setImgSrc(
          "https://e0.pxfuel.com/wallpapers/15/382/desktop-wallpaper-captain-america-png-gambar-ngetrend-dan-viral-baby-captain-america.jpg"
        );
        setAnim("");
        // alert("Collision detected!");
      }
      if (isOverlap) {
        //  return;
        img.current.src = capst;
        console.log(end)
        setEnd(false)
       
        alert(`Score1:${scores} ,"Scores2:${p2}`);
        window.location.reload()
        // window.location.reload();
        // window.location.reload();
      }
    };
    //checkCollision();
    const intervalId = setInterval(checkCollision, 16); // check collision every 16ms
    return () => clearInterval(intervalId);
  }, []);

  console.log("render");

  var keys = [];

  const marginRef = useRef();

  function update() {
    if (keys[38]) {
      if(div1Ref.current){
        div1Ref.current.style.marginTop = "-290px";
        img.current.src = jump;
      }
     
    } else {
      // setMarginB("0px")
      const downInterval = setTimeout(down, 1000);
      //  return ()=>clearTimeout(downInterval)
      // down()
    }

    function down() {
      if(div1Ref.current){
        div1Ref.current.style.marginTop = "0px";
        img.current.src = cap;
      }
  
    }
  }

  function draw() {}

  document.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
    //setDown(down1+1)
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
    setImgSrc(cap);
    setAnim("mymove 10s infinite");
    IncreaseScore()
  }



  const IncreaseScore = () => {
      let i=0
     id = setInterval(() => {
      if(scoreRef.current){
        scoreRef.current.innerText=i
  
      }
    
     if(i!==0){
       localStorage.setItem("score1",i)
       sendScores(i);
     }
     i++

    }, 1000);
    console.log(end)
    if(!end){
      clearInterval(id)
      return
    }
  };
  const handleReceiveScores = (data) => {
    setp2(data.scores);
    setp2Scores(data.scores)
    if( p2!==0){
        localStorage.setItem("score2",p2)
    }
  };
  useEffect(() => {
    socket.on("receive_scores", handleReceiveScores);
   
    return () => {
      socket.off("receive_scores", handleReceiveScores);
    };
  }, [socket]);
  return (
    <div className="flex justify-between">
      <div id="game-main">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "500px",
          }}
        >
          <div
            style={{
              width: "10%",
              height: "100px",
              marginLeft: `${marginL}px`,
              marginTop: marginB,
              border:"1px solid"
            }}
            id="div5"
            ref={div1Ref}
          >
            <img ref={img} width="120%" src={imgSrc} alt="" />
          </div>
          <div
            style={{
              width: "7%",
              animation: anim,
              position: "relative",
              height: "70px",
              marginTop: "150px",
              border:"1px solid"
            }}
            ref={div2Ref}
          >
            <img width="100%" src={fire} alt="" />
          </div>
        </div>
        {/* <button onClick={Onstart}>Start Game</button> */}
        <div className="fixed h-full w-4/5 mx-auto p-4 rounded-t-lg bg-gray-100 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Player 1: <span ref={scoreRef}>0</span></h2>
            <h2 className="text-lg font-bold text-gray-800">Player 2:{p2}</h2>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={()=>{
                Onstart()
          
              }}
              className="px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};
