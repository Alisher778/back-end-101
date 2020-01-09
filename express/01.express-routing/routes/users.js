const express = require('express');
const router = express.Router();
const users = require('../db/users');

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/salo', (req, res) => {
    const { id } = req.params;
    res.send('Salom User');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(users.find(item => item.id == id));
});

router.get('/:id/delete', (req, res) => {
    const { id } = req.params;
    users = users.filter(item => item.id != id)
    res.send(users);
});

module.exports = router;

