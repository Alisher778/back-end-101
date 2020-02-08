const express = require('express');
const path = require('path');
const cars = require('./db/cars.json');
const userRouter = require('./routes/users');
const carRouter = require('./routes/cars');
const session = require('express-session');
const methodOverride = require('method-override')
const app = express();


// view engine setu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fjsdgfjhsdghfgsdjgfhjdasjh321531276576jhgwjqgedags djasgdjasdjbasjhdfghasf hxfdaajhdgajs ',
  resave: false,
  saveUninitialized: false,
}));

app.use(function (req, res, next) {
  console.log(req.session);
  console.log('MTHOD', req.method)

  res.locals.admin = req.session.admin || false
  res.locals.user = req.session.user || ''
  res.locals.title = req.url.slice(1).toLocaleUpperCase() || ''
  next()
})

app.use(userRouter);
app.use('/cars', carRouter);

app.get('/', (req, res) => {
  const isLoggedIn = req.session.admin;
  res.render('index', { title: 'Home page', admin: isLoggedIn, cars });
});

app.listen(3000, () => console.log(3000))
module.exports = app;
