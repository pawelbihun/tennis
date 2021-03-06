const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddelHeight = 100;
const paddleWidht = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidht = 6;
const lineHeight = 16;

// gd = game difficulty
const gd = {
  easy: {
    ballSpeedIncrease: 0.1,
    ballSpeedMax: 12,
    ballSpeed: 2,
    aiYSmaller: 5,
    aiYGreater: 15
  },
  medium: {
    ballSpeedIncrease: 0.3,
    ballSpeedMax: 16,
    ballSpeed: 3,
    aiYSmaller: 10,
    aiYGreater: 20
  },
  hard: {
    ballSpeedIncrease: 0.5,
    ballSpeedMax: 20,
    ballSpeed: 4,
    aiYSmaller: 20,
    aiYGreater: 30
  }
}

let ballSpeedIncrease = gd.easy.ballSpeedIncrease;
let ballSpeedMax = gd.easy.ballSpeedMax;
let ballSpeed = gd.easy.ballSpeed;


let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;
let aiYGreater = gd.easy.aiYGreater;
let aiYSmaller = gd.easy.aiYSmaller;

topCanvas = canvas.offsetTop;

// local storage
let playerScores = 0;
let aiScores = 0;
const playerScoresDoc = document.querySelector(".player-scores--js");
const aiScoresDoc = document.querySelector(".ai-scores--js");
const localStorageValuePS = localStorage.getItem("PS");
if (localStorageValuePS) {
  playerScores = localStorageValuePS;
  playerScoresDoc.innerHTML = playerScores;
} else {
  localStorage.setItem("PS", 0);
}
const localStorageValueAIS = localStorage.getItem("AIS");
if (localStorageValueAIS) {
  aiScores = localStorageValueAIS;
  aiScoresDoc.innerHTML = aiScores;
} else {
  localStorage.setItem("AIS", 0);
}
/////////////////////////

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function resetGame() {
  ballX = cw / 2 - ballSize / 2;
  ballY = ch / 2 - ballSize / 2;
  ballSpeedX = 2;
  // losowy kąt startu piłki
  const random = getRandomInt(3) + 1;
  ballSpeedY = random;
  // losowo piłka w lewo lub prawo
  if (getRandomInt(2)) {
    ballSpeedY = -ballSpeedY;
  }
  if (getRandomInt(2)) {
    ballSpeedX = -ballSpeedX;
  }
}

function player() {
  ctx.fillStyle = "red";
  ctx.fillRect(playerX, playerY, paddleWidht, paddelHeight);
}

function ball() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= ch) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }
  // punkt dla ai
  if (ballX + ballSize <= 0) {
    aiScores++;
    localStorage.setItem("AIS", aiScores);
    aiScoresDoc.innerHTML = aiScores;
    console.log("punkt dla ai");
    resetGame();
  }
  // punkt dla player
  if (ballX >= cw) {
    playerScores++;
    localStorage.setItem("PS", playerScores);
    playerScoresDoc.innerHTML = playerScores;
    console.log("punkt dla player");
    resetGame();
  }
  // odbicie piłki od rakietki gracza
  if (
    ballX <= playerX + paddleWidht &&
    ballY <= playerY + paddelHeight &&
    ballY + ballSize >= playerY &&
    ballX >= playerX
    
  ) {
    ballX = playerX + paddleWidht + 1;
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
  // odbicie piłki od rakietki komputera
  if (
    ballX + ballSize >= aiX &&
    ballY + ballSize >= aiY &&
    ballY <= aiY + paddelHeight &&
    ballX + ballSize <= aiX + paddleWidht
  ) {
    ballX = aiX - ballSize - 1;
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
}

function table() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  for (let linePosition = 20; linePosition < ch; linePosition += 30) {
    ctx.fillStyle = "gray";
    ctx.fillRect(cw / 2 - lineWidht / 2, linePosition, lineWidht, lineHeight);
  }
}

function ai() {
  ctx.fillStyle = "blue";
  ctx.fillRect(aiX, aiY, paddleWidht, paddelHeight);
}

function playerPosition(e) {
  playerY = e.clientY - topCanvas - paddelHeight / 2;
  if (playerY >= ch - paddelHeight) {
    playerY = ch - paddelHeight;
  }
  if (playerY <= 0) {
    playerY = 0;
  }
}

function speedUp() {
  // speed X
  if (ballSpeedX > 0 && ballSpeedX < ballSpeedMax) {
    ballSpeedX += ballSpeedIncrease;
  } else if (ballSpeedX < 0 && ballSpeedX > -ballSpeedMax) {
    ballSpeedX -= ballSpeedIncrease;
  }
  //speed Y
  if (ballSpeedY > 0 && ballSpeedY < ballSpeedMax) {
    ballSpeedY += ballSpeedIncrease;
  } else if (ballSpeedY < 0 && ballSpeedY > -ballSpeedMax) {
    ballSpeedY -= ballSpeedIncrease;
  }
}

function aiPosition() {
  const middlePaddle = aiY + paddelHeight / 2;
  const middleBall = ballY + ballSize / 2;
  // zmienić na zmienne i dostosować do poziomów trudności gry
  // if (ballX > 500) {
  //   if (middlePaddle - middleBall > 200) {
  //     //console.log(">+200");
  //     aiY -= 15;
  //   } else if (middlePaddle - middleBall > 50) {
  //     // console.log("+50-200");
  //     aiY -= 5;
  //   } else if (middlePaddle - middleBall < -200) {
  //     // console.log("<-200");
  //     aiY += 15;
  //   } else if (middlePaddle - middleBall < -50) {
  //     // console.log("<-50-200");
  //     aiY += 5;
  //   }

    if (ballX > 500) {
      if (middlePaddle - middleBall > 200) {
        //console.log(">+200");
        aiY -= aiYGreater;
      } else if (middlePaddle - middleBall > 50) {
        // console.log("+50-200");
        aiY -= aiYSmaller;
      } else if (middlePaddle - middleBall < -200) {
        // console.log("<-200");
        aiY += aiYGreater;
      } else if (middlePaddle - middleBall < -50) {
        // console.log("<-50-200");
        aiY += aiYSmaller;
      }
  } else if (ballX <= 500 && ballX > 150) {
    if (middlePaddle - middleBall > 100) {
      aiY -= 3;
    } else if (middlePaddle - middleBall < -100) {
      aiY += 3;
    }
  }
}


canvas.addEventListener("mousemove", playerPosition);
function game() {
  table();
  ball();
  player();
  ai();
  aiPosition();
}

setInterval(game, 1000 / 60);

const buttonRestart = document.querySelector(".restart");
buttonRestart.addEventListener("click", () => {
  // reset player
  playerScores = 0;
  playerScoresDoc.innerHTML = playerScores;
  localStorage.setItem("PS", playerScores);
  // reset ai
  aiScores = 0;
  aiScoresDoc.innerHTML = aiScores;
  localStorage.setItem("AIS", aiScores);
  //reset game
  resetGame();
});

const buttonEasy = document.querySelector(".easy--js");
buttonEasy.addEventListener("click", () => {
  console.log("easy game difficulty");
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
  ballSpeedIncrease = gd.easy.ballSpeedIncrease;
  ballSpeedMax = gd.easy.ballSpeedMax;
  ballSpeed = gd.easy.ballSpeed;
  aiYGreater = gd.easy.aiYGreater;
  aiYSmaller = gd.easy.aiYSmaller;
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
  });

const buttonMedium = document.querySelector(".medium--js");
buttonMedium.addEventListener("click", () => {
  console.log("medium game difficulty");
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
  ballSpeedIncrease = gd.medium.ballSpeedIncrease;
  ballSpeedMax = gd.medium.ballSpeedMax;
  ballSpeed = gd.medium.ballSpeed;
  aiYGreater = gd.medium.aiYGreater;
  aiYSmaller = gd.medium.aiYSmaller;
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
});

const buttonHard = document.querySelector(".hard--js");
buttonHard.addEventListener("click", () => {
  console.log("hard game difficulty");
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
  ballSpeedIncrease = gd.hard.ballSpeedIncrease;
  ballSpeedMax = gd.hard.ballSpeedMax;
  ballSpeed = gd.hard.ballSpeed;
  aiYGreater = gd.hard.aiYGreater;
  aiYSmaller = gd.hard.aiYSmaller;
  console.log(`ballSpeedIncrease = ${ballSpeedIncrease}\nballSpeedMax = ${ballSpeedMax}\nballSpeed = ${ballSpeed}\naiYGreater = ${aiYGreater}\naiYSmaller = ${aiYSmaller}`);
});