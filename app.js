let randomNumber;
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

function newGame() {
  randomNumber = getRandomNumber(1, 100);
  previousGuesses = [];
  numGuesses = 1;
  playGame = true;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    return 'Please enter a valid number';
  } else if (guess < 1) {
    return 'Please enter a number greater than 1!';
  } else if (guess > 100) {
    return 'Please enter a number less than 100!';
  } else {
    previousGuesses.push(guess);

    if (numGuesses === 11) {
      return `Game Over! Number was ${randomNumber}`;
    } else {
      return checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    playGame = false;
    return 'You guessed correctly!';
  } else if (guess < randomNumber) {
    return 'Too low! Try again!';
  } else if (guess > randomNumber) {
    return 'Too high! Try again!';
  }
}

function play(guess) {
  if (!playGame) {
    return 'The game has ended. Start a new game.';
  }

  const validationResult = validateGuess(guess);
  numGuesses++;

  if (playGame && numGuesses > 11) {
    playGame = false;
  }

  return validationResult;
}

newGame(); // Start a new game

// Example usage:
console.log(play(50)); // Make a guess
console.log(play(75)); // Make another guess
