const http = require('http');


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/node':
            res.write(`Nodejs version ${process.version}`);
            res.end();
            break;
        case '/time':
            res.write(`Nodejs version ${process.uptime()}`);
            res.end();
            break;
        default:
            res.write('Error Page');
            res.end();
            break;
    }
}).listen(3000, () => console.log('App is running oon localhost:3000'));
