const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
const myName = (req, res, next) => {
    console.log('I am Hahha', req.body);
    next();
}
const carsRouter = require('./router/cars');

// For getting form data
app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/admin', (req, res, next) => {
    console.log('I am middleware', req.url);
    next();
});

app.get('/', myName, myName, myName, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/cars', carsRouter);



app.listen(3000, () => console.log('App is runing on port:' + port))