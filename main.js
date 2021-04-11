const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

const paddelHeight = 100;
const paddleWidht = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidht = 6;
const lineHeight = 16;

let ballSpeedX = 2;
let ballSpeedY = 2;

topCanvas = canvas.offsetTop;


function player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY ,paddleWidht, paddelHeight);
}

function ball() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(ballX, ballY ,ballSize,ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY;
        //speedUp();
    }
    // wyłączamy odbicie od końcowych lini pionowych
    // if (ballX <= 0 || ballX + ballSize >= cw){
    //     ballSpeedX = -ballSpeedX;
    //     // speedUp();
    // }
    // odbicie piłki od rakietki gracza
    if (ballX <= (playerX + paddleWidht) && (ballY + ballSize) >= playerY && ballY <= (playerY + paddelHeight)){
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    // odbicie piłki od rakietki komputera
    if ((ballX + ballSize) >= aiX && (ballY + ballSize) >= aiY && ballY <= (aiY + paddelHeight)){
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
}

function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch);
    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(cw / 2 - lineWidht / 2, linePosition, lineWidht, lineHeight);
    }
}

function ai() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY ,paddleWidht, paddelHeight);
}


function playerPosition(e) {
    playerY = e.clientY - topCanvas - paddelHeight / 2;
    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight;
    }
    if (playerY <= 0){
        playerY = 0;
    }
}

function speedUp(){
    // speed X
    if (ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += .3;
    }
    else if (ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX -= .3;
    }
    //speed Y
    if (ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY += .2;
    }
    else if (ballSpeedY < 0 && ballSpeedY > -16){
        ballSpeedY -=.2;
    }
}

function aiPosition(){
    const middlePaddle = aiY + paddelHeight / 2;
    const middleBall = ballY + ballSize / 2; 
    // zmienić na zmienne i dostosować do poziomów trudno ści gry 
    if (ballX > 500){
        if (middlePaddle - middleBall > 200){
            //console.log(">+200");
            aiY -= 15;
        }
        else if ( middlePaddle - middleBall > 50 ) {
            // console.log("+50-200");
            aiY -= 5;
        }
        else if (middlePaddle - middleBall < -200){
            // console.log("<-200");
            aiY += 15;
        }
        else if ( middlePaddle - middleBall < -50 ) {
            // console.log("<-50-200");
            aiY += 5;
        }
    }
    else if (ballX <= 500 && ballX > 150){
        if (middlePaddle - middleBall > 100) {
            aiY -= 3;
        }
        else if (middlePaddle - middleBall < -100) {
            aiY += 3;                }
    }
}

canvas.addEventListener("mousemove", playerPosition)
function game() {
    table();
    ball();
    player();
    ai();
    aiPosition();
}

setInterval(game, 1000/60)