import { renderPage, showWin, showRecords, closeResults } from './components';
import { createRandomArr, shuffle, showTime, saveGame, loadGame, countStep, playSound, switchSound, changeGame } from './utils';

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

function positioningCells(size) {
  const cells = document.querySelectorAll('.cell');  
  let numCell = 0;
  let row = 0;
  for (let i = 0; i < cells.length; i += size) {    
    for (let j = 0; j < size; j++) {
      if (numCell <= size**2 - 1) {
        cells[numCell].style.transform = `translate(${0 + j*100}%, ${0 + row*100}%)`;
        cells[numCell].style.width = `${100/size}%`;
        cells[numCell].style.height = `${100/size}%`;
        numCell++;
      }
    }
    row++;
  }
}

function getCellPosition(cell) {
  let stringPosition = cell.style.transform;
  let res = [];
  stringPosition.slice(10, stringPosition.length - 1)
    .split(', ')
    .forEach(el => res.push(el.slice(0, el.length - 1)));
  return res;
}

function moveCell(e) {
  const cells = document.querySelectorAll('.cell');
  let contentCell = +e.target.innerHTML;
  let indexCell;
  
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] === contentCell) indexCell = i;    
  }
  
  let position = getCellPosition(cells[indexCell]);
  let x = +position[0];
  let y = +position[1];  

  if (gameArr[indexCell + gameSize] === 0) {
    cells[indexCell].style.transform = `translate(${x}%, ${y + 100}%)`;
    gameArr[indexCell + gameSize] = gameArr[indexCell];
    gameArr[indexCell] = 0;
    countStep();
    playSound();
  } else if (gameArr[indexCell - gameSize] === 0) {
    cells[indexCell].style.transform = `translate(${x}%, ${y - 100}%)`;
    gameArr[indexCell - gameSize] = gameArr[indexCell];
    gameArr[indexCell] = 0;
    countStep();
    playSound();
  } else if (gameArr[indexCell + 1] === 0 && (indexCell + 1) % gameSize !== 0) {
    cells[indexCell].style.transform = `translate(${x + 100}%, ${y}%)`;
    gameArr[indexCell + 1] = gameArr[indexCell];
    gameArr[indexCell] = 0;
    countStep();
    playSound();
  } else if (gameArr[indexCell - 1] === 0 && indexCell % gameSize !== 0) {
    cells[indexCell].style.transform = `translate(${x - 100}%, ${y}%)`;
    gameArr[indexCell - 1] = gameArr[indexCell];
    gameArr[indexCell] = 0; 
    countStep();
    playSound();
  }
  setTimeout(refreshGameField, 100);
  checkWin(); 
}

function refreshGameField() {
  const gamefildBlock = document.querySelector('.block-gamefild');
  let htmlContent = '';
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] !== 0) {
      htmlContent += `<div class="cell" draggable="true">${gameArr[i]}</div>`;
    } else htmlContent += `<div class="cell empty" style="display: none">${gameArr[i]}</div>`;
  }
  gamefildBlock.innerHTML = htmlContent;
  positioningCells(gameSize);
  addListeners();
}

function checkWin() {
  if (JSON.stringify(gameArr) === JSON.stringify(solvedArr)) {   
    let showMin = (min < 10) ? ('0' + min) : min;
    let showSec = (sec < 10) ? ('0' + sec) : sec; 
    let recordsArr = JSON.parse(localStorage.getItem('records')) || [];
    let result = {
      size: `${gameSize} x ${gameSize}`,
      time: `${showMin} : ${showSec}`,
      step: `${step}`,
    };
    recordsArr.push(result);
    localStorage.setItem('records', JSON.stringify(recordsArr));    
    showWin();    
  }
  return;
}

export { gameArr, gameSize, solvedArr, sec, min, step, audioPlay, newGame, refreshGameField }