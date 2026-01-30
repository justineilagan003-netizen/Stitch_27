const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

let box = 20;
let snake = [{x: 9*box, y: 10*box}];
let food = randomFood();
let d = "RIGHT";
let score = 0;
let game;

document.addEventListener("keydown", direction);

// Mobile swipe support
let touchStartX=0, touchStartY=0;
canvas.addEventListener('touchstart', e=>{ touchStartX=e.touches[0].clientX; touchStartY=e.touches[0].clientY; });
canvas.addEventListener('touchend', e=>{
  let dx = e.changedTouches[0].clientX - touchStartX;
  let dy = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(dx)>Math.abs(dy)){
    if(dx>0 && d!="LEFT") d="RIGHT";
    else if(dx<0 && d!="RIGHT") d="LEFT";
  } else {
    if(dy>0 && d!="UP") d="DOWN";
    else if(dy<0 && d!="DOWN") d="UP";
  }
});

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function randomFood(){
    return {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
}

function draw(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle=(i==0)?"lime":"green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle="red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    if(d=="LEFT") snakeX -= box;
    if(d=="UP") snakeY -= box;
    if(d=="RIGHT") snakeX += box;
    if(d=="DOWN") snakeY += box;

    if(snakeX==food.x && snakeY==food.y){
        score++;
        food=randomFood();
    } else snake.pop();

    let newHead = {x:snakeX, y:snakeY};

    if(snakeX<0||snakeY<0||snakeX>=canvas.width||snakeY>=canvas.height||collision(newHead,snake)){
        clearInterval(game);
        alert("Game Over! Score: "+score);
    }

    snake.unshift(newHead);
}

function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x==array[i].x && head.y==array[i].y) return true;
    }
    return false;
}

function restartGame(){
    snake=[{x:9*box, y:10*box}];
    food=randomFood();
    d="RIGHT";
    score=0;
    clearInterval(game);
    game = setInterval(draw,100);
}

game = setInterval(draw,100);