
var words = [
  "apple",
  "aeroplane",
  "train",
  "people",
  "dance",
  "family",
  "children",
  "chocolate",
  "society",
  "amature",
  "category",
  "community",
  "government","environment","excellent","existence","identity","individual",
  "sacrifice","rythm","gurantee","average","achieve","accomodate","restaurant",
  "programme","profession","privilege","pronunciation", "cabbage", "potato",
  "tomato", "onion","community","human","monkey","animal","picture", "rabbit",
"happiness","sadness","darkness","woman", "normal","chicken","peacock","sparrow",
 "language","beautiful","football","badminton","college","school","penguin","kangaroo",
 "hippopotamus","leopard","crocodile"
]

let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
var score = 0;

var hangSound = new Audio("./sounds/beep3.wav" ) ;
hangSound.oncanplaythrough = function(){
  hangSound.pause();
}
hangSound.loop = true;
hangSound.onended = function(){
  hangSound.play();
}

var lostSound = new Audio("./sounds/lost.mp3" ) ;
lostSound.oncanplaythrough = function(){
  lostSound.pause();
}
lostSound.loop = true;
lostSound.onended = function(){
  lostSound.play();
}

var winSound = new Audio("./sounds/win.mp3" ) ;
winSound.oncanplaythrough = function(){
  winSound.pause();
}
winSound.loop = true;
winSound.onended = function(){
  winSound.play();
}

var correct = new Audio("./sounds/beep.mp3" ) ;
correct.oncanplaythrough = function(){
  correct.pause();
}
correct.loop = true;
correct.onended = function(){
  correct.play();
}

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];

}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn-primary btn"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    
    guessedWord();
    checkIfGameWon();
    hangSound.pause();
    correct.play();
    score++;
    updateScore();
    
    
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
    hangSound.play();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Congratulations!!! You Won!!!';
    winSound.play();
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = '<span id = "one"> The answer was: </span> '  + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!   Try Again!!!';
    lostSound.play();
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
function updateScore() {
  document.getElementById('score').innerHTML = score;
}


function reset() {
  mistakes = 0;
  score = score;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  updateScore();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();