const router = require('express').Router();
const db = require('../db/mysql');

router.get('/', (req, res) => {
  const qry = `Select * FROM Books`;
    db.query(qry, (err, result) => {
      if(!err) {
        res.render('Books/new', {data: result});
      } else {
        res.send(err);
      }
    })
  
});

router.post('/', (req, res) => {
  const {title, pages, price} = req.body;
  const date = `${new Date().getFullYear}-${new Date().getMonth()}-${new Date().getDate()}`;
  const qry = `INSERT INTO Books (title, pages, price, createdAt)
               Values('${title}', ${pages}, ${price}, ${date});
              `;
    db.query(qry, (err, result) => {
      if(!err) {
        res.send('Data created');
      } else {
        res.send(err);
      }
    })
});

module.exports = router;