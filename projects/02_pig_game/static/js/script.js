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

let scores, currentScore, activePlayer, playing;

init();

btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", handleBtnRoll);
btnHold.addEventListener("click", handleBtnHold);

function init() {
  const setZero = (el) => {
    el.textContent = 0;
  };

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playing = true;
  activePlayer = currentScore = scores[0] = scores[1] = 0;
  [score0El, score1El, current0El, current1El].forEach(setZero);
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function handleBtnRoll() {
  if (!playing) return;
  const number = Math.trunc(Math.random() * 6) + 1;

  dice.classList.remove("hidden");
  dice.src = `static/imgs/dice-${number}.png`;

  if (number === 1) {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    switchPlayer();
  } else {
    currentScore += number;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
}

function handleBtnHold() {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 20) {
    playing = false;
    dice.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
}
