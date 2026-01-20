// 1. ファイルの最上部で dotenv を読み込む（第2章の修正）
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose'); // mongooseの読み込みを確認

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
var yesnoRouter = require('./routes/yesno');
var catRouter = require('./routes/cat');
var notesFromBRouter = require('./routes/notes_from_b');

var app = express();

// 2. MongoDBへの接続設定（第2章の修正）
// .env ファイルの DATABASE_URL を使って接続します
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB接続成功'))
  .catch((err) => console.error('MongoDB接続エラー:', err));

app.use(cors());

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
app.use('/cat', catRouter);
app.use('/notes_from_b', notesFromBRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;