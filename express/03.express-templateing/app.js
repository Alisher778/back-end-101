const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const carsRouter = require('./router/cars');

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/cars', carsRouter);

app.get('/', (req, res) => {
    res.render('index', { name: 'Home Page', author: '<h1>Alisher</h1>' });
});

app.listen(port, () => console.log('App is running localhost:' + port));

module.exports = app;