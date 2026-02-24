const grid = document.getElementById("grid");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");

let score = 0;
let currentMole = null;
let timeLeft = 45;
let moleTimer;
let countdownTimer;

// Create 9 boxes
for (let i = 0; i < 9; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("id", i);
  grid.appendChild(square);

  square.addEventListener("click", () => {
    if (square.id === currentMole) {
      score++;
      scoreDisplay.textContent = score;
      currentMole = null;
    }
  });
}

function randomMole() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.classList.remove("mole");
  });

  const randomIndex = Math.floor(Math.random() * 9);
  squares[randomIndex].classList.add("mole");
  currentMole = squares[randomIndex].id;
}

function moveMole() {
  moleTimer = setInterval(randomMole, 1200); // Slower movement (easier)
}

function countDown() {
  countdownTimer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdownTimer);
      clearInterval(moleTimer);
      alert("Game Over! Your score is " + score);
    }
  }, 1000);
}

function startGame() {
  score = 0;
  timeLeft = 45;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  moveMole();
  countDown();
}