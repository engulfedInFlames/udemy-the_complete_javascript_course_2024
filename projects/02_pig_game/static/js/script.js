"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

const scores = [0, 0];
let currentScore = 0;
let playerActive = 0;

score0El.textContent = 0;
score1El.textContent = 0;

const handleBtnNewClick = () => {
  score0El.textContent = score0El.textContent = 0;
  makeAllPlayersInactive();
  [score0El, score1El, current0El, current1El].forEach((el) => {
    setZero(el);
  });
};

const handleBtnRollClick = () => {
  const number = Math.trunc(Math.random() * 6) + 1;
  const currentScoreActive = document.getElementById(
    `current--${playerActive}`
  );
  const scoreActive = document.getElementById(`score--${playerActive}`);

  dice.classList.remove("hidden");
  dice.src = `static/imgs/dice-${number}.png`;

  if (number === 1) {
    currentScoreActive.textContent = 0;
    scoreActive.textContent = 0;
    currentScore = 0;
    playerActive = playerActive === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  } else {
    currentScore += number;
    currentScoreActive.textContent = currentScore;
  }
};

const handleBtnHoldClick = () => {
  document.getElementById(`score--${playerActive}`).textContent = currentScore;

  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = parseInt(
    document.getElementById(`score--${playerActive}`).textContent
  );
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnNew.addEventListener("click", handleBtnNewClick);
btnRoll.addEventListener("click", handleBtnRollClick);
btnHold.addEventListener("click", handleBtnHoldClick);
