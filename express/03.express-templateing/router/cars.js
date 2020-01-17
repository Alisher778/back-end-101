const express = require('express');
const router = express.Router();
const path = require('path');
const carsDb = require('../db/cars');
const fs = require('fs');
const cars = require('../db/cars2.json');

router.get('/', (req, res) => {
    res.render('cars/cars', { data: cars });
});
router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-cars.html'));
});

router.post('/new', (req, res) => {
    const data = req.body;
    const parsCars = cars;

    const newData = parsCars.push({ ...req.body, id: Date.now() });

    fs.writeFile(path.join(__dirname, '../db/cars2.json'), JSON.stringify(parsCars), (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(parsCars);
        }
    })

});


module.exports = router;
