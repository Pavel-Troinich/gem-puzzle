import { gameArr, gameSize, sec, min, step } from './index';

function renderPage() {
  const gameBody = document.createElement('div');
  gameBody.className = 'wrapper-game';

  const btnBlock = document.createElement('div');
  btnBlock.className = 'block-buttons';
  btnBlock.insertAdjacentHTML('afterbegin',
    `<button class="new-game">New game</button>
    <button class="switch-sound">Sound Off</button>
    <button class="save">Save</button>
    <button class="load">Load</button>
    <button class="records">Results</button>`
  );
  
  const infoBlock = document.createElement('div');
  infoBlock.className = 'block-info';
  infoBlock.insertAdjacentHTML('afterbegin',
    `<div>Step:</div>
    <div class="moves">0</div>
    <div>Time:</div>
    <div class="time"></div>`
  );

  const gamefildBlock = document.createElement('div');
  gamefildBlock.className = 'block-gamefild';
  let htmlContent = '';
  for (let i = 0; i < gameArr.length; i++) {
    if (gameArr[i] !== 0) {
      htmlContent += `<div class="cell">${gameArr[i]}</div>`
    } else htmlContent += `<div class="cell" style="display: none">${gameArr[i]}</div>`
  }
  gamefildBlock.insertAdjacentHTML('afterbegin',
    `${htmlContent}`
  );

  const changegameBlock = document.createElement('div');
  changegameBlock.className = 'block-changegame';
  changegameBlock.insertAdjacentHTML('afterbegin',
    `<input type="radio" id="radio9" name="radio" class="radio" value="3">
    <label for="radio9">3x3</label>    
    <input type="radio" id="radio16" name="radio" class="radio" value="4">
    <label for="radio16">4x4</label>
    <input type="radio" id="radio25" name="radio" class="radio" value="5">
    <label for="radio25">5x5</label>
    <input type="radio" id="radio36" name="radio" class="radio" value="6">
    <label for="radio36">6x6</label>
    <input type="radio" id="radio49" name="radio" class="radio" value="7">
    <label for="radio49">7x7</label>
    <input type="radio" id="radio64" name="radio" class="radio" value="8">
    <label for="radio64">8x8</label>`    
  );

  gameBody.append(btnBlock);
  gameBody.append(infoBlock);
  gameBody.append(gamefildBlock);
  gameBody.append(changegameBlock);
  document.body.append(gameBody);
  return gameBody;
}

function showModal(content) {  
  let overlay = document.createElement('div');
  overlay.className = "overlay";
  overlay.innerHTML = `
  <div class="win" onclick="event.stopPropagation()">
    <div class="close">
      <img class="modal-close" src="./src/assets/x_icon.png" alt="close">        
    </div>
    ${content}
  </div>`;

  document.body.append(overlay);
  let closeIcon = document.querySelector('.close');
  overlay.addEventListener('click', closeResults);
  closeIcon.addEventListener('click', closeResults);
}

function showWin() {
  let showMin = (min < 10) ? ('0' + min) : min;
  let showSec = (sec < 10) ? ('0' + sec) : sec;
  let message = `Hooray! You solved the puzzle in ${showMin} : ${showSec} and ${step} moves!`;

  showModal(message);
}

function showRecords() {
  let resultArr = JSON.parse(localStorage.getItem('records'));
  let resultHtml = '';
  if (resultArr) {
    for (let i = 0; i < resultArr.length; i++) {
      resultHtml += `<tr><td>${i + 1}</td><td>${resultArr[i].size}</td><td>${resultArr[i].time}</td><td>${resultArr[i].step}</td></tr>`
    }
  }
  let tableResults = `
    <table class="table">
    <caption>Score table</caption>
    <tr><th>№</th><th>Size</th><th>Time</th><th>Moves</th></tr>
    ${resultHtml}
    </table>`;
  
  showModal(tableResults);
}

function closeResults() {
  let overlay = document.querySelector('.overlay');
  overlay.remove();  
}

export { renderPage, showWin, showRecords, closeResults, showModal };