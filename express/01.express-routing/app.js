const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.get('/bye', (req, res) => {
    res.send('<h1>Hello MAn</h1>');
});

app.get('/book*nice', (req, res) => {
    res.send('<h1>Hello Nice MAn</h1>');
});


app.route('/')
    .get((req, res) => {
        res.send({ name: 'Alisher' })
    })
    .post((req, res) => {
        console.log(req.body);
        res.send('I am post page');
    });

app.get('/form', (req, res) => {
    res.send('<form action="/" method="POST"><input name="name"><button>Send</button></form>');
});

app.get('/herro/:id/:job', (req, res) => {

    res.send('Hello ' + req.params.id + req.params.job);
});

app.get('/download', (req, res) => {
    res.download('./view/man.html', 'bobo.html');
})
app.get('/json', (req, res) => {
    res.json({ name: 'hello', id: 67 });
});

app.get('/hayr', (req, res) => {
    res.redirect('/form');
});

app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'video.mp4'));
});

app.get('*', (req, res) => {
    res.status(404).send('<h2>Sorry dedimku</h2>')
})

app.listen(port, () => console.log('App is running on port ' + port))