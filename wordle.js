// Define a list of words to choose from
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'pear', 'quince', 'raspberry','poop', 'strawberry', 'tangerine', 'watermelon'];

// Choose a random word from the list
const secretWord = words[Math.floor(Math.random() * words.length)];

// Set up variables to keep track of the state of the game
let guessesRemaining = 6;
let guessedLetters = [];

// Display the letter boxes for the secret word
const wordBox = document.getElementById('word-box');
for (let i = 0; i < secretWord.length; i++) {
  const letterBox = document.createElement('div');
  letterBox.classList.add('letter-box');
  wordBox.appendChild(letterBox);
}

// Display the number of guesses remaining
const guessesRemainingText = document.getElementById('guesses-remaining');
guessesRemainingText.textContent = guessesRemaining + '';

// Handle a guess when the user clicks the "Guess" button
const guessButton = document.getElementById('guess-button');
guessButton.addEventListener('click', () => {
  const guessInput = document.getElementById('word-input');
  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';
  
  // Check if the guess is valid
  if (guess.length !== secretWord.length || guessedLetters.includes(guess)) {
    return;
  }
  
  // Add the guess to the list of guessed letters
  guessedLetters.push(guess);
  
  // Check if the guess is correct
  const correctLetters = [];
  let correctGuess = false;
  for (let i = 0; i < secretWord.length; i++) {
    const letterBox = wordBox.children[i];
    if (secretWord[i] === guess[i]) {
      letterBox.textContent = guess[i];
      letterBox.classList.add('correct');
      correctLetters.push(i);
      correctGuess = true;
    }
  }
  
  // Handle a correct guess
  if (correctGuess) {
    if (correctLetters.length === secretWord.length) {
      // Handle a win
      alert('You win!');
      guessInput.disabled = true;
      guessButton.disabled = true;
      }
    } else {
        guessesRemaining--;
        guessesRemainingText.textContent = guessesRemaining + '';
        if (guessesRemaining === 0) {
            // Handle a loss
            alert('You lose! The word was ' + secretWord + '.');
            guessInput.disabled = true;
            guessButton.disabled = true;
          } else {
            // Mark the guess as incorrect
            const incorrectLetters = [];
            for (let i = 0; i < secretWord.length; i++) {
              if (!correctLetters.includes(i) && secretWord[i] === guess[i]) {
                incorrectLetters.push(i);
              }
            }
            const incorrectLetterBoxes = wordBox.querySelectorAll('.letter-box:not(.correct)');
            const incorrectLetterBox = incorrectLetterBoxes[incorrectLetters.length - 1];
            incorrectLetterBox.textContent = guess[incorrectLetters[incorrectLetters.length - 1]];
            incorrectLetterBox.classList.add('incorrect');
          }   
        }
    });