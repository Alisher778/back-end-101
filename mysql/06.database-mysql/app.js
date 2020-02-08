const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');

const port = 3000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  db: 'demo3'
});

db.connect((err) => {
  if (err) throw new Error(err);
  db.query(`CREATE DATABASE IF NOT EXISTS demo2`, (err, result) => {
    if (!err) {
      console.log('Databse is created', result);
    } else {
      console.log(err)
    }
  })
  console.log('database is connected')
})



app.get('/database/show', (req, res) => {
  db.query(`SHOW DATABASES`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send(result);
    console.log(result);
  });

});

app.get('/database/:name', (req, res) => {
  db.query(`CREATE DATABASE ${req.params.name}`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send('Success');
    console.log(result);
  });

});

app.get('/database/:name/drop', (req, res) => {
  db.query(`DROP DATABASE ${req.params.name}`, (err, result) => {
    if (err) {
      return res.send(err)
    }
    res.send('Success');
    console.log(result);
  });

});

app.listen(port, () => console.log('App is running'));

module.exports = app;
