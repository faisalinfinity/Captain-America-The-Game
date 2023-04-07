import React, { useEffect, useRef, useState } from 'react'


type Player = {
    x: number;
    y: number;
    width: number;
    height: number;
    speed:number,

  };

  type obstacle={
    x: number;
    y: number;
    width: number;
    height: number;
    speed:number,
  }

  ///var score = 0;

export const Game1 = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [player,setPlayer]=useState<Player>({
        x: 50,
        y: 350,
        width: 50,
        height: 50,
        speed: 5
    })

    const [obstacle,setObstacle]=useState<obstacle>({
        x: 800,
        y: 350,
        width: 50,
        height: 50,
        speed: 5
    })

    let [score,setScore]=useState<Number>(0)


   





    useEffect(()=>{
       

       //let ctx:CanvasRenderingContext2D;
       const canvas = canvasRef.current;
       const context = canvas?.getContext("2d");

if(canvas && context){
    const loop=()=>{
        update(context,canvas);
        draw(context,canvas);
        requestAnimationFrame(loop);
    }
    
    loop();
}








    },[])


        
    var keys:any=[];

    document.addEventListener("keydown", function(event) {
        keys[event.keyCode] = true;
    });
    
    document.addEventListener("keyup", function(event) {
        keys[event.keyCode] = false;
    });
    

        
function draw(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
//    ctx.drawImage(img, player.x, player.y);

    // Draw the obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Draw the score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function update(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
    // Move the obstacle
    obstacle.x -= obstacle.speed;

    // If the obstacle goes off the screen, reset its position and increase the score
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
        setScore(score)
    }

    // Check for collision
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
        // If there's a collision, reset the score and the obstacle position
        score = 0;
        alert("Game Over")
        obstacle.x = canvas.width;
    }

    // Move the player
    if (keys[38]) { // Up arrow
    
        player.y -= player.speed;
        
    }
    if (keys[40]) { // Down arrow
        player.y += player.speed;
    }
    if (keys[37]) { // Left arrow
        player.x -= player.speed;
    }
    if (keys[39]) { // Right arrow
        player.x += player.speed;
    }

    // Keep the player inside the canvas
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}



  return (
    <div>
<canvas 
 ref={canvasRef}
 width={800}
 height={400}
>

</canvas>
    </div>
  )
}
