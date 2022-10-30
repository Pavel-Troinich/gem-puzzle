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
  
  if ((gameSize % 2) !== 0 && (inversionCount % 2) !== 0 ) {
    createRandomArr(gameSize);
  } else if ((gameSize % 2) === 0 && (inversionCount % 2) !== 0 ) {
    createRandomArr(gameSize);
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



export { createRandomArr, shuffle, showTime };