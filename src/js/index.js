import { renderPage, showWin, showRecords, closeResults } from './components';
import { createRandomArr, shuffle, showTime } from './utils';

let gameSize = 3;
let audioPlay = true;
let solvedArr = [];
let gameArr = [];
let step = 0;
let min = 0;
let sec = 0;

createRandomArr(gameSize);
renderPage();
positioningCells(gameSize);
showTime();
addListeners();

function newGame() {
  document.body.innerHTML = '';
  createRandomArr(gameSize);
  renderPage();
  positioningCells(gameSize);
  min = 0;
  sec = 0;
  step = 0;
  addListeners();
}

function addListeners() {
  const btnNewGame = document.querySelector('.new-game');
  btnNewGame.addEventListener('click', newGame);

  const btnSwitchSound = document.querySelector('.switch-sound');
  btnSwitchSound.addEventListener('click', switchSound);

  const btnSave = document.querySelector('.save');
  btnSave.addEventListener('click', saveGame);

  const btnLoad = document.querySelector('.load');
  btnLoad.addEventListener('click', loadGame);

  const btnRecords = document.querySelector('.records');
  btnRecords.addEventListener('click', showRecords);

  const cells = document.querySelectorAll('.cell');
  cells.forEach(item => item.addEventListener('click', (e) => moveCell(e)));
  
  const gameSizes = document.querySelectorAll('.radio');
  gameSizes.forEach(item => item.addEventListener('click', changeGame));
}