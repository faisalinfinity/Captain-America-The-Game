import React, { useEffect, useRef, useState } from 'react'



type Player = {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityX: number;
    velocityY: number;
    isJumping: boolean;
  };
  
  type Projectile = {
    x: number;
    y: number;
    radius: number;
    velocityX: number;
  };
  
export const Game = () => {

    
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [player, setPlayer] = useState<Player>({
          x: 50,
          y: 300,
          width: 50,
          height: 50,
          velocityX: 0,
          velocityY: 0,
          isJumping: false,
        });
        const [projectiles, setProjectiles] = useState<Projectile[]>([]);
      
        useEffect(() => {
          const canvas = canvasRef.current;
          const context = canvas?.getContext("2d");

          
      
          if (canvas && context) {
            // Set up game loop
            const gameLoop = () => {
              update();
              render(context);
              requestAnimationFrame(gameLoop);
            };
            gameLoop();
          }
        }, []);

        
      
        const update = () => {
          // Update player position based on velocity
          player.x += player.velocityX;
          player.y += player.velocityY;
      
          // Apply gravity to player velocity
          player.velocityY += 1;
      
          // Stop player from falling through the ground
          if (player.y + player.height >= 400) {
            player.velocityY = 0;
            player.isJumping = false;
            player.y = 400 - player.height;
          }
      
          // Remove off-screen projectiles
          setProjectiles((projectiles) =>
            projectiles.filter((projectile) => projectile.x < 800)
          );
      
          // Update projectile position based on velocity
          setProjectiles((projectiles) =>
            projectiles.map((projectile) => ({
              ...projectile,
              x: projectile.x + projectile.velocityX,
            }))
          );
        };
      
        const render = (context: CanvasRenderingContext2D) => {
          // Clear canvas
          context.clearRect(0, 0, 800, 400);
      
          // Draw player
          context.fillRect(player.x, player.y, player.width, player.height);
      
          // Draw projectiles
          projectiles.forEach((projectile) => {
            context.beginPath();
            context.arc(
              projectile.x,
              projectile.y,
              projectile.radius,
              0,
              Math.PI * 2
            );
            context.fill();
          });
        };
      
        const jump = () => {
          if (!player.isJumping) {
            player.velocityY = -20;
            player.isJumping = true;
          }
        };
      
        const shoot = () => {
          const newProjectile: Projectile = {
            x: player.x + player.width,
            y: player.y + player.height / 2,
            radius: 5,
            velocityX: 10,
          };
          setProjectiles([...projectiles, newProjectile]);
        };
      

  return (
    <div>
         <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onClick={shoot}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " ") jump();
        }}
      ></canvas>

      <button onClick={shoot}>Click</button>
    </div>
  )
}
