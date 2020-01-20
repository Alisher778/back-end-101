var express = require('express');
var path = require('path');
const userRouter = require('./routes/users');
const moneyRouter = require('./routes/money');
const session = require('express-session');
var app = express();
// view engine setu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fjsdgfjhsdghfgsdjgfhjdasjh321531276576jhgwjqgedags djasgdjasdjbasjhdfghasf hxfdaajhdgajs ',
  resave: false,
  saveUninitialized: true,
}))
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.session);
  next()
})

app.use(userRouter);
app.use('/money', moneyRouter);
app.get('/', (req, res) => {
  console.log(req.session)
  const isLoggedIn = req.session.admin;
  res.render('index', { title: 'Home page', admin: isLoggedIn, data: [{ id: 1, name: 'Bobo' }] });
});

app.listen(3000, () => console.log(3000))
module.exports = app;
// module.exports.auth = auth;
