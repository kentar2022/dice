const playerOneScore = document.querySelector('.player-one');
const playerTwoScore = document.querySelector('.player-two');
const globalScore1 = document.querySelector('.global_score1');
const globalScore2 = document.querySelector('.global_score2');
const notificationElement = document.querySelector('.alert');
const rollDiceButton = document.querySelector('.roll_dice');
const audio_dice = new Audio('sounds/dice.mp3');
const audio_notification = new Audio('sounds/notif.mp3');
const win = new Audio('sounds/win.mp3');
const player_win_one = document.querySelector('.player-win_one');
const player_win_two = document.querySelector('.player-win_two');
const holdButton = document.querySelector('.hold');
const turn_one = document.querySelector('.turn_one');
const turn_two = document.querySelector('.turn_two');
const cube_one = document.querySelector('.one_point');
const cube_two = document.querySelector('.two_point');
const cube_three = document.querySelector('.three_point');
const cube_four = document.querySelector('.four_point');
const cube_five = document.querySelector('.five_point');
const cube_six = document.querySelector('.six_point');




let count = 0;
let currentPlayer = 1;
let lastRollTime = 0;
const cooldownTime = 1000;



rollDiceButton.addEventListener('click', click_dice);

function click_dice() {
  gamover();
  const now = Date.now();
  if (now - lastRollTime < cooldownTime) {
    console.log("Le dé ne peut pas être tiré deux fois d'affilé");
    return;
  }

  lastRollTime = now;
  count = Math.floor(Math.random() * 6) + 1;
  
  if (currentPlayer === 1) {
    playerOneScore.textContent = +playerOneScore.textContent + count;
    turn_two.classList.add("turn_off");
    turn_one.classList.remove("turn_off");

  }
  else {
    playerTwoScore.textContent = +playerTwoScore.textContent + count;
    turn_one.classList.add("turn_off");
    turn_two.classList.remove("turn_off");
  }

  if (count === 1) {
    cube_one.classList.add("cube_settings");
    showNotification(`Le joueur ${currentPlayer} a obtenu 1. C'est le tour du joueur suivant`);
    if (currentPlayer === 1) {
      playerOneScore.textContent = 0;
    } else {
      playerTwoScore.textContent = 0;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    audio_notification.play();
  }
  audio_dice.play();
  removeDice();
};

function gamover() {
  if (parseInt(globalScore1.textContent) >= 100) {
    player_win_one.classList.remove('player-win_one');
    endGame();
  } else if (parseInt(globalScore2.textContent) >= 100) {
    player_win_two.classList.remove('player-win_two');
    endGame();
  }
}

holdButton.addEventListener('click', hold_points);

function hold_points() { 
  if (currentPlayer === 1) {
    let newScore = parseInt(playerOneScore.textContent) + parseInt(globalScore1.textContent);
    globalScore1.textContent = newScore;
    currentPlayer = 2;
    playerOneScore.textContent = 0;
  } else {
    let newScore = parseInt(playerTwoScore.textContent) + parseInt(globalScore2.textContent);
    globalScore2.textContent = newScore;
    currentPlayer = 1;
    playerTwoScore.textContent = 0;
  }
  showNotification(`C'est le tour du joueur ${currentPlayer}`);
  audio_notification.play();
};

function showNotification(message) {
  notificationElement.textContent = message;
  notificationElement.classList.add('notification-message');
  notificationElement.style.display = 'flex';

  setTimeout(() => {
    notificationElement.style.display = 'none';
    notificationElement.classList.remove('notification-message');

  }, 2000);
}


const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', function() {
  count = 0;
  playerOneScore.textContent = count;
  playerTwoScore.textContent = count;
  globalScore1.textContent = count;
  globalScore2.textContent = count;
  rollDiceButton.addEventListener("click", click_dice);
  rollDiceButton.classList.add('roll_dice');
  player_win_one.classList.add('player-win_one');
  player_win_two.classList.add('player-win_two');
  holdButton.addEventListener('click', hold_points);
  holdButton.classList.add('hold_points');
});

function endGame() {
  rollDiceButton.removeEventListener('click', click_dice);
  rollDiceButton.classList.remove('roll_dice');
  holdButton.removeEventListener('click', hold_points);
  holdButton.classList.remove('hold_points');
  win.play();
};

function removeDice() {

  if (count === 2) {
      cube_two.classList.add("cube_settings");
    }
    if (count === 3) {
      cube_three.classList.add("cube_settings");
    }
    if (count === 4) {
      cube_four.classList.add("cube_settings");
    }
    if (count === 5) {
      cube_five.classList.add("cube_settings");
    }
    if (count === 6) {
      cube_six.classList.add("cube_settings");
    }

    setTimeout(() => {
    cube_one.classList.remove('cube_settings');
    cube_two.classList.remove('cube_settings');
    cube_three.classList.remove('cube_settings');
    cube_four.classList.remove('cube_settings');
    cube_five.classList.remove('cube_settings');
    cube_six.classList.remove('cube_settings');
  }, 1000);


  
}
