const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numRight = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
  for (const letter of word) {
    //console.log(letter);
    document.querySelector('#word-container').insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
  for(const letter of ALPHABET) {
    document.querySelector('#letter-buttons').insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.setAttribute('disabled', 'true');
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
  if (document.querySelector(`.${letter}`) === null) {
    return false;
  }
  return true;
};


const handleCorrectGuess = (letter) => {
  correctGuesses = document.querySelectorAll(`.${letter}`);
  for (const guess of correctGuesses) {
    numRight += 1;
    guess.innerHTML = letter;
  }
  
};


const handleWrongGuess = () => {
  numWrong += 1;
  document.querySelector('img').setAttribute('src', `/static/images/guess${numWrong}.png`);
  if (numWrong == 5) {
    const lettersRemaining = document.querySelectorAll('button');
    for (const remainingLetter of lettersRemaining) {
      remainingLetter.setAttribute('disabled', 'true');
    }
    const playAgain = document.querySelector('#play-again');
    playAgain.innerHTML = 'The shark got you! Click here to play again.'
    playAgain.style.display = '';
  }
};

const resetGame = () => {
  numWrong = 0;
  numRight = 0;
  const newWordContainer = document.querySelector('#word-container');
  const newButtons = document.querySelector('#letter-buttons');
  document.querySelector('img').setAttribute('src', '/static/images/guess0.png');
  document.querySelector('#play-again').style.display = 'none';
  while (newWordContainer.firstChild) {
    newWordContainer.firstChild.remove();
  }

  while (newButtons.firstChild) {
    newButtons.firstChild.remove();
  }

  word = WORDS[Math.floor(Math.random()*WORDS.length)];
  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      pressedButton = evt.target;
      disableLetterButton(pressedButton);

      if(isLetterInWord(pressedButton.innerHTML)) {
        handleCorrectGuess(pressedButton.innerHTML);
      }

      else {
        handleWrongGuess();
      }
    
    })
  }

  // add an event handler to handle clicking on the Play Again button
  const reset = document.querySelector('#play-again');
  reset.addEventListener('click', resetGame);
}

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  const word = WORDS[Math.floor(Math.random()*WORDS.length)]; //Referred to https://www.w3schools.com/js/js_random.asp for random int help
  console.log(word);
  // call the function that makes an empty line for each letter in the word
  createDivsForChars(word);

  // call the function that makes a button for each letter in the alphabet
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      pressedButton = evt.target;
      disableLetterButton(pressedButton);

      if(isLetterInWord(pressedButton.innerHTML)) {
        handleCorrectGuess(pressedButton.innerHTML);

        if (numRight == word.length) {
          const lettersRemaining = document.querySelectorAll('button');
          for (const remainingLetter of lettersRemaining) {
            remainingLetter.setAttribute('disabled', 'true');
          }
          const playAgain = document.querySelector('#play-again');
          playAgain.innerHTML = 'You won! Play again?'
          playAgain.style.display = '';
        }
      }

      else {
        handleWrongGuess();
      }
    
    })
  }

  // add an event handler to handle clicking on the Play Again button
  const reset = document.querySelector('#play-again');
  reset.addEventListener('click', resetGame);
})();
