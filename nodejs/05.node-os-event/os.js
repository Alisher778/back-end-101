const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/mem':
            res.write(`Nodejs version ${os.freemem()}, ${os.arch()}`);
            res.end();
            break;
        case '/time':
            res.write(`Nodejs version ${process.uptime()}`);
            res.end();
            break;
        case '/cpu':
            const model = os.cpus()[0].model;
            res.write(`CPU model ${model}`);
            res.write(`CPU core numbers ${os.cpus().length}`);
            res.end();
            break;
        case '/ip':
            const newtwork = os.networkInterfaces();
            console.log(newtwork)
            // res.write(`CPU model ${model}`);
            // res.write(`CPU core numbers ${os.cpus().length}`);
            res.end();
            break;
        case '/release': {
            const newtwork = os.release();
            console.log(newtwork)
            // res.write(`CPU model ${model}`);
            // res.write(`CPU core numbers ${os.cpus().length}`);
            res.end();
            break;
        }
        default:
            res.write('Error Page');
            res.end();
            break;
    }
}).listen(3000, '0.0.0.0', () => console.log('App is running oon localhost:3000'));

console.log(os.cpus())