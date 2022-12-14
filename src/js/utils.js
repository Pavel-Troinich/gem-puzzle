import { gameArr, gameSize, solvedArr, sec, min, step, audioPlay, fonAudio, newGame, refreshGameField } from './index';
import { showModal } from './components';

function createRandomArr(size) {
  let arr1 = [];
  let arr2 = [];
  for (let i = 1; i <= size**2 - 1; i++) {
    arr1.push(i);
    arr2.push(i);
  } 
  shuffle(arr1);
  
  let inversionCount = 0;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = i; j <= arr1.length; j++) {
      if (arr1[i] > arr1[j]) inversionCount++;
    }    
  }
  
  if ((size % 2) !== 0 && (inversionCount % 2) !== 0 ) {
    createRandomArr(size);
  } else if ((size % 2) === 0 && (inversionCount % 2) !== 0 ) {
    createRandomArr(size);
  } else {
    arr1.push(0);
    arr2.push(0);
    gameArr = arr1;
    solvedArr = arr2;
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }  
}

function showTime() {
  const time = document.querySelector('.time');
  time.textContent = `${(min < 10) ? ('0' + min) : min} : ${(sec < 10) ? ('0' + sec) : sec}`;
  sec++;
  if (sec >= 60) {
    min++;
    sec = 0;
  }
  setTimeout(showTime, 1000);
}

function saveGame() {
  localStorage.setItem('savedArr', gameArr);
  localStorage.setItem('savedStep', step);
  localStorage.setItem('savedSec', sec);
  localStorage.setItem('savedMin', min);
  localStorage.setItem('savedSize', gameSize);  
}

function loadGame() {
  if (localStorage.getItem('savedArr')) {
    let tempArr = [];
    localStorage.getItem('savedArr').split(',').forEach((el) => tempArr.push(+el));
    gameArr = tempArr;
    sec = +localStorage.getItem('savedSec');
    min = +localStorage.getItem('savedMin');
    step = +localStorage.getItem('savedStep');
    gameSize = +localStorage.getItem('savedSize');
    const steps = document.querySelector('.moves');
    steps.textContent = step;
    refreshGameField();
  } else {
    let message = 'No saved game!';
    showModal(message);
  }
}

function countStep() {
  step++;
  const steps = document.querySelector('.moves');
  steps.textContent = step;  
}

function playSound(setAudio) {
  const audio = new Audio(setAudio.path);
  audio.autoplay = audioPlay;
  audio.loop = setAudio.loop;
}

function switchSound() {
  if (audioPlay) {
    audioPlay = false;
    this.textContent = 'Sound Off';
    this.style.borderColor = "red";
    fonAudio.pause();
  } else {
    audioPlay = true;
    this.textContent = 'Sound Off'
    this.style.borderColor = "#8ec030";
    fonAudio.play();
  }
}

function changeGame() {
  gameSize = +this.value;
  newGame();
  this.checked = true;
}

export { createRandomArr, shuffle, showTime, saveGame, loadGame, countStep, playSound, switchSound, changeGame };