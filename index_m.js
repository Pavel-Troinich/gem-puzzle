














function switchSound() {
  if (audioPlay) {
    audioPlay = false;
    this.textContent = 'Sound On'
  } else {
    audioPlay = true;
    this.textContent = 'Sound Off'
  }
}







function countStep() {
  step++;
  const steps = document.querySelector('.moves');
  steps.textContent = step;
  playSound();
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



function playSound() {
  const audio = new Audio('./assets/step.mp3');
  audio.autoplay = audioPlay;
  audio.loop = false;
}

function changeGame() {
  gameSize = +this.value;
  newGame();
  this.checked = true;
}