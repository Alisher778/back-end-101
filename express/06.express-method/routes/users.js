var express = require('express');
var router = express.Router();
const usersDb = require('../db/users');


router.get('/sign-in', (req, res) => {
  res.render('sign-in', { title: 'Sign In Page' });
});
router.get('/users', (req, res) => {
  res.send(usersDb);
});

router.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const user = usersDb.find(user => user.email == email && user.password == password);
  if (user) {
    req.session.admin = true;
    req.session.user = user.email;
    res.render('index', { admin: true, title: 'Success Page', });
  } else {
    res.send('Sorry email or password is wrong');
  }
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { title: 'Sign up Page' });
});

router.post('/sign-up', (req, res) => {
  usersDb.push(req.body);
  req.session.admin = true;
  req.session.user = req.body.email;
  res.redirect('/');
});

router.get('/log-out', (req, res) => {
  req.session.admin = false;
  req.session.user = null;
  res.redirect('/sign-in');
});
module.exports = router;
