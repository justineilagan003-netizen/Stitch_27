const canvas = document.getElementById("carCanvas");
const ctx = canvas.getContext("2d");

let carWidth = 40;
let carHeight = 70;
let carX = canvas.width/2 - carWidth/2;
let carY = canvas.height - carHeight - 10;
let carSpeed = 20;

let obstacles = [];
let obstacleWidth = 40;
let obstacleHeight = 70;
let obstacleSpeed = 5;

let score = 0;
let game;

// Draw the car
function drawCar(){
  ctx.fillStyle="lime";
  ctx.fillRect(carX, carY, carWidth, carHeight);

  // optional headlights
  ctx.fillStyle="white";
  ctx.fillRect(carX+5, carY+10, 10, 10);
  ctx.fillRect(carX+carWidth-15, carY+10, 10, 10);
}

// Draw obstacles
function drawObstacles(){
  ctx.fillStyle="red";
  for(let i=0;i<obstacles.length;i++){
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacleWidth, obstacleHeight);
  }
}

// Create new obstacle
function spawnObstacle(){
  let x = Math.floor(Math.random() * (canvas.width/obstacleWidth)) * obstacleWidth;
  obstacles.push({x:x, y:-obstacleHeight});
}

// Move obstacles and check collision
function moveObstacles(){
  for(let i=0;i<obstacles.length;i++){
    obstacles[i].y += obstacleSpeed;

    // Collision
    if(obstacles[i].x < carX + carWidth &&
       obstacles[i].x + obstacleWidth > carX &&
       obstacles[i].y < carY + carHeight &&
       obstacles[i].y + obstacleHeight > carY){
         clearInterval(game);
         alert("Game Over! Score: "+score);
       }

    // Remove obstacle if it goes off screen
    if(obstacles[i].y > canvas.height){
      obstacles.splice(i,1);
      score++;
    }
  }
}

// Draw everything
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawCar();
  drawObstacles();
}

// Game loop
function gameLoop(){
  draw();
  moveObstacles();
}

// Desktop controls
document.addEventListener("keydown", e=>{
  if(e.key === "ArrowLeft") moveLeft();
  if(e.key === "ArrowRight") moveRight();
});

// Move functions
function moveLeft(){
  carX -= carSpeed;
  if(carX<0) carX=0;
}
function moveRight(){
  carX += carSpeed;
  if(carX+carWidth>canvas.width) carX = canvas.width - carWidth;
}

// Restart game
function restartGame(){
  carX = canvas.width/2 - carWidth/2;
  obstacles = [];
  score = 0;
  clearInterval(game);
  spawnObstacle();
  game = setInterval(gameLoop,50);
}

// Spawn obstacles every 1.5 seconds
setInterval(spawnObstacle,1500);

// Start game
game = setInterval(gameLoop,50);