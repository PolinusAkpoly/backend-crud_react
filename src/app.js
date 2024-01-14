var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var path = require('path');
var dotenvExpand = require('dotenv-expand')


var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)
const connection = require('../config/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRoutes');
var postsRouter = require('./routes/PostRoutes');
const { loadUsers, loadPost } = require('./helpers/load_data');






var app = express();

loadUsers()
loadPost()

app.use((req, res, next)=>{
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-Auth-Token, date, content-Type, content-Length, Authorization')
      res.setHeader('Access-Control-Allow-Origin', "*")
      next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


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
  res.json({
    error: 'error'
  });
  // res.render('error');
});

module.exports = app;
