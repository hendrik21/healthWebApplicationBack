const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bodyParser = require("body-parser");
const cors = require('cors');
const {getAllAnswers, saveAnswer, getAnswersByName} = require("./controllers/answerController");
require('dotenv').config(); // Load environment variables
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.json());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// API endpoint to save answers
app.post('/api/answers', (req, res) => {
  try {
    const newAnswerData = req.body;
    const savedAnswer = saveAnswer(newAnswerData);
    res.json(savedAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API endpoint to retrieve all answers
app.get('/api/answers', (req, res) => {
  const allAnswers = getAllAnswers();
  res.json(allAnswers);
});

// API endpoint to retrieve answers by name
app.get('/api/answers/:name', (req, res) => {
  const name = req.params.name;
  const answersByName = getAnswersByName(name);
  res.json(answersByName);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
