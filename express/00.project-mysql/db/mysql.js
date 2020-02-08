const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alisher66",
  database: 'Books'
});

connection.connect((err, success) => {
  if(err) throw new Error(err);
  
  console.log('Connection was successfull');
});

module.exports = connection;