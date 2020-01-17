const express = require('express');
const router = express.Router();
const path = require('path');

const carsDb = [
    { id: 1, model: 'Nexia', brand: 'Chevy' },
    { id: 2, model: 'Spark', brand: 'Chevy' },
    { id: 3, model: 'Malibu', brand: 'Chevy' },
    { id: 4, model: 'Tracker', brand: 'Chevy' },
]
router.get('/', (req, res) => {
    res.json(carsDb)
});

router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cars.html'))
});

router.post('/new', (req, res) => {
    const newCar = { ...req.body, id: carsDb.length + 1 };
    carsDb.push(newCar)
    res.send(newCar);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundCar = carsDb.find(car => car.id == id);

    if (foundCar) {
        res.json(foundCar);
    } else {
        res.send("There is no any car")
    }
});




module.exports = router;