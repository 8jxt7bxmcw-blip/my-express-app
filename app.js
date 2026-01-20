var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // CORSの読み込み

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
var yesnoRouter = require('./routes/yesno');
var catRouter = require('./routes/cat');            // 【追加】第2章用
var notesFromBRouter = require('./routes/notes_from_b'); // 【追加】第4章用

var app = express();

app.use(cors()); // CORSを許可する設定

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/yesno', yesnoRouter);
app.use('/cat', catRouter);            // 【追加】http://localhost:30032/cat でアクセス可能に
app.use('/notes_from_b', notesFromBRouter); // 【追加】http://localhost:30032/notes_from_b でアクセス可能に

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;