const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const DB_NAME = 'mongodb://localhost/poll';
const Agendas = require('./model/agenda');

const agendaController = require('./controllers/agenda');
const getAgendaController = require('./controllers/getAgendas');
const createPollController = require('./controllers/createPollAgenda');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(('/scripts'), express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(DB_NAME, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Database loaded successfully');
  })
  .catch((err) => console.log(err));

const io = require('socket.io')(server);

io.on('connection', async (socket) => {
  // create new Agenda
  agendaController(io, socket);
  //getAgendas
  getAgendaController(io, socket);

  createPollController(io, socket);
});

server.listen(8000, () => console.log('App is running on 8000'));

module.exports = app;
