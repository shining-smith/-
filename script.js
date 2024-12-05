'use strict';

//选择元素
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--0');
const current2El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const diceRollBtn = document.querySelector('.btn--roll');
const session1El = document.querySelector('.player--0');
const session2El = document.querySelector('.player--1');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

let playing = true;
const finalscore = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//切换玩家
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  session1El.classList.toggle('player--active');
  session2El.classList.toggle('player--active');
};

//获胜
const win = () => {
  playing = false;
  document
    .querySelector(`#name--${activePlayer}`)
    .classList.add('.player--winner.name');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  diceEl.classList.toggle('hidden');
};

//事件处理函数
const diceRollHandler = () => {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${number}.png`;
    diceEl.classList.remove('hidden');

    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};
const holdHandler = () => {
  if (playing) {
    finalscore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalscore[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    if (finalscore[activePlayer] < 10) {
      switchPlayer();
    } else {
      win();
    }
  }
};
const newGame = () => {
  playing = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`#name--${activePlayer}`)
    .classList.remove('player--winner.name');
  session1El.classList.add('player--active');
  activePlayer = 0;
  currentScore = 0;
  finalscore[0] = 0;
  finalscore[1] = 0;
};

//初始状态
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

diceRollBtn.addEventListener('click', diceRollHandler);
holdBtn.addEventListener('click', holdHandler);
newBtn.addEventListener('click', newGame);
