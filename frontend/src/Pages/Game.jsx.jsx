import React, { useCallback, useEffect, useRef, useState } from "react";
import cap from "../Images/cap.gif";
import "./js.css";
import lost from "../Images/lost.png";
import fire from "../Images/fire.gif";
import capst from "../Images/capst.png";
import jump from "../Images/jump.png";
import cap1 from "../Images/cap-st.png"

export const Game = () => {
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const [isColliding, setIsColliding] = useState(false);

  const [col, setCol] = useState(false);

  const timerref = useRef(null);

  const [marginB, setMarginB] = useState("-70px");
  const [marginL, setMarginL] = useState(100);

  const [dis, setDis] = useState(0);
  const [dis1, setDis1] = useState(0);

  const [imgSrc, setImgSrc] = useState(cap1);
  const rect1 = div1Ref.current?.getBoundingClientRect();
  const rect2 = div2Ref.current?.getBoundingClientRect();

  const [down1, setDown] = useState(0);

  const img = useRef();
const [backimg,setbackimg]=useState("")

const [score, setScore] = useState(0);


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
      const div1 = div1Ref.current.getBoundingClientRect();
      const div2 = div2Ref.current.getBoundingClientRect();
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
        alert("lost");
        window.location.reload();
        // window.location.reload();
      }
    };
    //checkCollision();


    

    const intervalId = setInterval(checkCollision, 16); // check collision every 16ms
    return () => {
                  clearInterval(intervalId)
                 // clearInterval(timer)
                 };
    
  }, []);

  console.log("render");

  var keys = [];

  const marginRef = useRef();

  function update() {
    if (keys[38]) {
      div1Ref.current.style.marginTop = "-290px";
      img.current.src = jump;
      console.log("hello");
      //     setMarginB("-290px")
      //   setImgSrc(jump)
      //console.log("jii")
    } else {
      // setMarginB("0px")
      const downInterval = setTimeout(down, 1000);
      //  return ()=>clearTimeout(downInterval)
      // down()
    }

    function down() {
      div1Ref.current.style.marginTop = "-70px";
      img.current.src = cap;
      // console.log("hello")
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

  function score1(){
    const timer = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
    }, 1000);
  }

  function scoreclear(){
  
  }

  function Onstart() {
    score1()
    setImgSrc(cap);
    setAnim("mymove 10s infinite");
  }

  return (
    <div id="game-main">
      <h1>Score:{score}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
          height: "500px",
          width:"100%"
        }}
      >
        <div
          style={{
            width: "10%",
            height: "100px",
            marginLeft: `${marginL}px`,
            border: "1px solid black",
            marginTop: marginB,
          }}
          id="div5"
          ref={div1Ref}
        >
          <img ref={img} width="120%" src={imgSrc} alt="" />
        </div>
        <div
          style={{
            width: "7%",
            border: "1px solid black",
            animation: anim,
            position: "relative",
            height: "70px",
            marginTop: "50px",
          }}
          ref={div2Ref}
        >
          <img width="100%" src={fire} alt="" />
        </div>
      </div>
      <button onClick={Onstart}>Start Game</button>
    </div>
  );
};
