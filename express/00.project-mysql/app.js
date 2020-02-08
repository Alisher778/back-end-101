const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db/mysql');
const port = 3000;

const app = express();

const booksRouter = require('./routes/books');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/post', (req, res) => {
  const query = 'CREATE TABLE IF NOT EXISTS Books (id INT PRIMARY KEY AUTO_INCREMENT, title varchar(255), pages INT, price INT, createdAt DATE)';
  db.query(query, (err, result) => {
    if(err) {
      res.status(404).send('Database erro');
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(port, () => console.log('App is running on localhost:'+port));
module.exports = app;
