var express = require('express');
var router = express.Router();
let carsDb = require('../db/cars');
const isLoggedIn = require('../util/authMiddleware');

router.get('/', (req, res) => {
  res.render('cars/index', { cars: carsDb });
});

router.get('/new', (req, res) => {
  res.render('cars/new');
});

router.post('/new', (req, res) => {
  carsDb.push({ ...req.body, id: Date.now() });
  res.redirect('/cars');
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const data = carsDb.find(car => car.id == id);
  res.render('cars/edit', { data });
});

router.get('/:id/delete', (req, res) => {
  const { id } = req.params;
  carsDb = carsDb.filter(car => car.id != id);
  res.redirect('/cars/');
});

router.post('/:id/edit', (req, res) => {
  const { id } = req.params;

  carsDb.forEach((car, index) => {
    if (car.id == id) {
      carsDb[index] = { ...req.body, id };
    }

  });

  res.redirect('/cars/' + id);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = carsDb.find(car => car.id == id);
  res.render('cars/show', { data });
});
module.exports = router;
