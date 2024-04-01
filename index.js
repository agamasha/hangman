let gameWrapper = document.createElement('div');
let gallowsWrapper = document.createElement('div');
let gallowsPic = document.createElement('img');
let wordGuessWrapper = document.createElement('div');
let wordTop = document.createElement('div');
let hintText = document.createElement('div');
let keyboard = document.createElement('div');
let triesCountText = document.createElement('div');
let modalGameOver = document.createElement('div');
let modalText = document.createElement('div');
let playAgainButton = document.createElement('div');

gameWrapper.classList.add('game-wrapper');
gallowsWrapper.classList.add('gallows-wrapper');
gallowsPic.classList.add('gallows-pic');
wordGuessWrapper.classList.add('word-guess-wrapper');
wordTop.classList.add('word');
hintText.classList.add('hint');
triesCountText.classList.add('wrong-count');
keyboard.classList.add('keyboard');
modalGameOver.classList.add('modal-game-over');
modalText.classList.add('modal-text');
playAgainButton.classList.add('play-again-button');

document.body.append(gameWrapper);
gameWrapper.appendChild(gallowsWrapper);
gallowsWrapper.appendChild(gallowsPic);
gameWrapper.appendChild(wordGuessWrapper);
wordGuessWrapper.appendChild(wordTop);
wordGuessWrapper.appendChild(hintText);
wordGuessWrapper.appendChild(triesCountText);
wordGuessWrapper.appendChild(keyboard);
gameWrapper.appendChild(modalGameOver);
modalGameOver.appendChild(modalText);
modalGameOver.appendChild(playAgainButton);

triesCountText.innerHTML = 'Incorrect guesses: 0 / 6';
playAgainButton.innerHTML = 'Play again';

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let pictures = [
  './img/hangman0.png',
  './img/hangman1.png',
  './img/hangman2.png',
  './img/hangman3.png',
  './img/hangman4.png',
  './img/hangman5.png',
  './img/hangman6.png'
]
let keys = [];
let wrongCount = 0;
let correctCount = 0;

gallowsPic.src = pictures[0];

for (let i = 0; i < alphabet.length; i ++) {
  keys[i] = document.createElement('div');
  keys[i].innerHTML = alphabet[i];
  keys[i].classList.add('key');
  keyboard.appendChild(keys[i]);
  keys[i].addEventListener('click', e => initGame(e.target, alphabet[i]));
}

let initGame = (key, clickedLetter) => {
  if (guessedWord.includes(clickedLetter)) {
    for (let i = 0; i < guessedWord.length; i ++) {
      if (guessedWord[i] === clickedLetter) {
        wordTop.querySelectorAll('div')[i].innerText = clickedLetter;
        wordTop.querySelectorAll('div')[i].classList.add('guessed-letter');
        correctCount ++;
      }
    }
  }
  else {
    wrongCount ++;
    triesCountText.innerHTML = `Incorrect guesses: ${wrongCount} / 6`;
    gallowsPic.src = pictures[wrongCount];
  }
  key.classList.remove('key');
  key.classList.add('not-active-key');
  if (correctCount === guessedWord.length) {
    gameOver(true);
  }
  if (wrongCount === 6) {
    gameOver(false);
  }
}

let gameOver = (result) => {
  modalGameOver.style.display = 'flex';
  if (result) {
    modalText.innerHTML = `You win! The word was: "${guessedWord}"`;
  }
  else {
    modalText.innerHTML = `You lose! The word was: "${guessedWord}"`;
  }
}

let wordsGuessList = [
  {
    word: 'WHALE',
    hint: 'The biggest animal.'
  },
  {
    word: 'HUNGER',
    hint: 'What happens if you do not eat for long time.'
  },
  {
    word: 'CHESS',
    hint: 'Popular game on black and white field.'
  },
  {
    word: 'VARIETY',
    hint: 'State of having different forms or types.'
  },
  {
    word: 'TOASTER',
    hint: 'Device for making toasted bread.'
  },
  {
    word: 'LAPTOP',
    hint: 'Compact PC.'
  },
  {
    word: 'POSITIVE',
    hint: 'Opposite for negative.'
  },
  {
    word: 'SHARK',
    hint: 'Baby ...., tutu tutu tutu.'
  },
  {
    word: 'PUPPY',
    hint: 'Little dog.'
  },
  {
    word: 'RECTANGLE',
    hint: 'Wide square.'
  },
];

let guessedWord;

let newGame = () => {
  modalGameOver.style.display = 'none';
  correctCount = 0;
  wrongCount = 0;
  triesCountText.innerHTML = 'Incorrect guesses: 0 / 6';
  gallowsPic.src = pictures[0];
  for (let i = 0; i < alphabet.length; i ++) {
    keys[i].classList.add('key');
    keys[i].classList.remove('not-active-key');
  }
  wordTop.innerHTML = guessedWord.split('').map(() => `<div class = "letter"></div>`).join('');
}

let randomWord = () => {
  let {word, hint} = wordsGuessList[Math.floor(Math.random() * wordsGuessList.length)];
  hintText.innerHTML = hint;
  guessedWord = word;
  newGame();
}

randomWord();

playAgainButton.addEventListener('click', randomWord);