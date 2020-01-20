var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
    const { admin, user } = req.session;
    if (admin && user) {
        next();
    } else {
        res.send('<h1>You need to sign in first <a href="/sign-in">Sign In </a></h1>')
    }
}
router.get('/', isLoggedIn, (req, res) => {
    res.send('I am money')
});
router.get('/open', (req, res) => {
    res.send('Open')
});


module.exports = router;