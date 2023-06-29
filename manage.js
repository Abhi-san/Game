const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sanitizer = require('sanitizer');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

let todolist = [];
let playGame = true;
let guess = 0; // Default guess value

app.set('view engine', 'ejs');

app.use(express.static('public'));

// Generate a random number between 1 and 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Check if the guess is correct
function checkGuess(randomNumber, guess) {
  if (guess === randomNumber) {
    return 'You guessed correctly!';
  } else if (guess < randomNumber) {
    return 'Too low! Try again!';
  } else if (guess > randomNumber) {
    return 'Too high! Try again!';
  }
}

// Validate the user's guess
function validateGuess(randomNumber, guess) {
  if (isNaN(guess)) {
    return 'Please enter a valid number';
  } else if (guess < 1) {
    return 'Please enter a number greater than 1!';
  } else if (guess > 100) {
    return 'Please enter a number less than 100!';
  } else {
    return checkGuess(randomNumber, guess);
  }
}

// Play the game
function playGameFunc(randomNumber, guess) {
  if (!playGame) {
    return 'The game has ended. Start a new game.';
  }

  const validationResult = validateGuess(randomNumber, guess);
  playGame = validationResult !== 'You guessed correctly!';

  return validationResult;
}

app.get('/todo/:id', function (req, res) {
  let todoIdx = req.params.id;
  let todo = todolist[todoIdx];

  if (todo) {
    const randomNumber = getRandomNumber();
    res.render('edititem.ejs', {
      todoIdx,
      todo,
      clickHandler: "func1();",
      playGame,
      guess,
      play: playGameFunc.bind(null, randomNumber)
    });
  } else {
    res.redirect('/todo');
  }
});

app.post('/todo/add/', function (req, res) {
  let newTodo = sanitizer.escape(req.body.newtodo);
  if (req.body.newtodo != '') {
    todolist.push(newTodo);
  }
  res.redirect('/todo');
});

app.get('/todo/delete/:id', function (req, res) {
  if (req.params.id != '') {
    todolist.splice(req.params.id, 1);
  }
  res.redirect('/todo');
});

app.use(function (req, res, next) {
  res.redirect('/todo');
});

app.listen(port, '0.0.0.0', function () {
  console.log(`Todolist running on http://0.0.0.0:${port}`);
});

module.exports = app;
