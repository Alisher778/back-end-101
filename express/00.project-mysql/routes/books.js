const router = require('express').Router();
const db = require('../db/mysql');
const DBName = 'Books';
const query = require('../db/query');

router.get('/', (req, res) => {
  const qry = `SELECT id, title FROM Books`;
  db.query(qry, (err, result) => {
    if (!err) {
      res.render('Books/index', { data: result });
    } else {
      res.send(err);
    }
  })

});

router.get('/new', (req, res) => {
  const qry = `CREATE TABLE IF NOT EXISTS Books(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(255), pages INT, price INT)`;
  db.query(qry, (err, result) => {
    if (!err) {
      const qry = `Select * FROM Books`;
      db.query(qry, (err, result) => {
        if (!err) {
          res.render('Books/new', { data: result });
        } else {
          res.send(err);
        }
      })
    } else {
      res.send(err);
    }
  })
});

router.post('/new', (req, res) => {
  const { title, pages, price, info, img } = req.body;
  const qry = `INSERT INTO Books (title, pages, price, info, img)
               Values('${title}', ${pages}, ${price}, '${info}', '${img}');
              `;
  db.query(qry, (err, result) => {
    if (!err) {
      res.redirect('/books');
    } else {
      res.send(err);
    }
  })
});

router.get('/:id', (req, res) => {
  const qry = query.selectById(DBName, req.params.id);
  db.query(qry, (err, result) => {
    if (!err) {
      res.render('Books/show', { data: result[0] });
    } else {
      res.send(err);
    }
  })

});

router.get('/:id/edit', (req, res) => {
  const qry = query.selectById(DBName, req.params.id);
  db.query(qry, (err, result) => {
    if (!err) {
      res.render('Books/edit', { data: result[0] });
    } else {
      res.send(err);
    }
  })
});

router.post('/:id/edit', (req, res) => {
  const { title, pages, price, info, img } = req.body;
  const qry = `UPDATE Books SET title='${title}', price=${price}, pages=${pages}, img='${img}', info='${info}' WHERE id = ${req.params.id}`;
  db.query(qry, (err, result) => {
    if (!err) {
      res.render('Books/show', { data: req.body });
    } else {
      res.send(err);
    }
  })
});

router.get('/:id/delete', (req, res) => {
  const qry = query.deleteById(DBName, req.params.id);
  db.query(qry, (err, result) => {
    if (!err) {
      res.redirect('/books');
    } else {
      res.send(err);
    }
  })

});


module.exports = router;