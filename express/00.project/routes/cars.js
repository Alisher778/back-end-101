var express = require('express');
var router = express.Router();
let carsDb = require('../db/cars.json');
// const isLoggedIn = require('../util/authMiddleware');
const multer = require('../util/multer');
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
  res.render('cars/index', { cars: carsDb });
});
router.get('/list', (req, res) => {
  res.json(carsDb);
});

router.get('/new', (req, res) => {
  res.render('cars/new');
});

router.post('/new', multer.single('img'), (req, res) => {

  let img = '';
  if (req.file) {
    img = req.file.path.slice(6);
  }

  carsDb.push({ ...req.body, id: Date.now(), img });
  fs.writeFile(path.join(__dirname, '../db/cars.json'), JSON.stringify(carsDb, null, 4), (err, data) => {
    console.log(err, data)
  });
  res.redirect('/cars');
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const data = carsDb.find(car => car.id == id);
  res.render('cars/edit', { data });
});

router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;
  const updatedData = carsDb.filter((car) => car.id != id);
  console.log('DELETE', req.method);

  fs.writeFile(path.join(__dirname, '../db/cars.json'), JSON.stringify(updatedData, null, 4), (err, data) => {
    if (!err) {
      res.redirect('/cars/');
    }
    console.log(err)
  });


});

router.put('/:id/edit', multer.single('img'), (req, res) => {
  const { id } = req.params;
  carsDb.forEach((car, index) => {
    if (car.id == id) {
      let img = '';
      if (req.file) {
        img = req.file.path.slice(6);
      } else {
        img = carsDb[index].img;
      }

      carsDb[index] = { ...carsDb[index], ...req.body, img };
      return;
    }
  });

  fs.writeFile(path.join(__dirname, '../db/cars.json'), JSON.stringify(carsDb, null, 4), (err, data) => {
    if (!err) {
      res.redirect('/cars/' + id);
    }
  });

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = carsDb.find(car => car.id == id);
  res.render('cars/show', { data });
});
module.exports = router;
