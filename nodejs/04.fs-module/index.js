const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/') {
        const l = fs.link('data.txt', 'data2.txt', (err) => {
            console.log(err, 'done');
        });
        res.write('Hello');
        res.end();

    } else if (req.url === '/create') {
        const myFile = fs.createWriteStream('data.txt');
        for (let i = 0; i < 1000; i++) {
            myFile.write('hello world\n');
        }
        myFile.end();
        res.write('<a href="/read">Read</a>');
        res.end()
    } else if (req.url === '/read') {
        const myFile = fs.createReadStream('data.txt');
        myFile.pipe(res);
    } else {
        fs.truncate("data2.txt", 40, err => {
            if (!err) {
                console.log("Truncated");
            }
        });
        res.write('done');
        res.end();
    }
}).listen(3000);