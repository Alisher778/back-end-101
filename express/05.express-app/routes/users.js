var express = require('express');
var router = express.Router();
const usersDb = require('../db/users');
const auth = require('../db/auth');


router.get('/sign-in', (req, res) => {
  res.render('sign-in', { title: 'Sign In Page' });
  console.log(auth, usersDb)
});
router.get('/users', (req, res) => {
  res.send(usersDb);
  console.log(auth, usersDb)
});

router.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const user = usersDb.find(user => user.email == email && user.password == password);
  console.log(user)
  if (user) {
    auth.admin = true;
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

  res.redirect('/sign-in');
});

router.get('/log-out', (req, res) => {
  auth.admin = false;
  res.redirect('/sign-in');
});
module.exports = router;
