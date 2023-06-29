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

app.use(express.static('public'));

app.get('/todo', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
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

app.listen(port, function () {
  console.log(`Todolist running on http://0.0.0.0:${port}`);
});

module.exports = app;
