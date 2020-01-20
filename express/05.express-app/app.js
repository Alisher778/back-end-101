var express = require('express');
var path = require('path');
const userRouter = require('./routes/users');
var app = express();
const auth = require('./db/auth');
// view engine setu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRouter);
app.get('/', (req, res) => {
  res.render('index', { title: 'Home page', admin: auth.admin, data: [{ id: 1, name: 'Bobo' }] });
});

app.listen(3000, () => console.log(3000))
module.exports = { app, auth };
// module.exports.auth = auth;
