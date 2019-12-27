const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = 3000;
const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.write('Home page');
            res.end();
            break;
        case '/append':
            fs.appendFile('./hello2.txt', 'Hello world\n', 'utf8', (err) => {
                if (err) {
                    return err;
                }
                res.write('Appeded');
                res.end();
            })

            break;
        default:
            res.write('<a href="/">Go to Home Page </a>')
            res.end();
    }
})

server.listen(port, () => console
    .log(`Server is running on port port'${port}`));