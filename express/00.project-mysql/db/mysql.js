const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'Books'
});


connection.connect((err, success) => {
  connection.query(`CREATE DATABASE IF NOT EXISTS Books`, (err, result) => {
    if (!err) {
      console.log(result)
    } else {
      console.log(err)
    }
  })
});



module.exports = connection;