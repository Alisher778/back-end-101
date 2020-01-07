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
        case '/create':
            const myData = fs.createWriteStream('data.txt');
            for (let i = 0; i < 1000000; i++) {
                myData.write('hello world');
            }

            res.write('done');
            res.end();
            break;
        case '/read':
            const readData = fs.createReadStream('data.txt');
            readData.pipe(res);
            break;
        case '/link':
            fs.link('hello.txt', 'link.txt', (err) => {
                if (!err) {
                    res.write('Linked');
                    res.end();
                }
            })
            break;
        case '/folder':
            fs.mkdir('demo', { recursive: false }, (err) => {
                if (!err) {
                    res.write('aha');
                    res.end()
                }
                console.log(err)
            });
            break;
        case '/write':
            fs.writeFile('demo/style.css', 'body {background: black}', (err) => {
                if (!err) {
                    res.write('aha');
                    res.end()
                }
                console.log(err)
            });
            break;
        case '/exist':
            // fs.exists('demo/style.css', (exist) => {
            //     res.write(`${exist}`);
            //     res.end();
            // })
            fs.access('index.html', fs.constants.F_OK, (exist) => {
                console.log(typeof exist)
                res.write(`${exist}`);
                res.end();
            })

            break;
        case '/temp':
            // fs.exists('demo/style.css', (exist) => {
            //     res.write(`${exist}`);
            //     res.end();
            // })
            fs.mkdtemp('temp/index', (err, folder) => {
                console.log(folder)
                res.write(`${folder}`);
                res.end();
            })

            break;
        case '/reddir':
            fs.readdir(__dirname, (err, files) => {
                console.log(files);
            })
            res.write('hshsh');
            res.end()
            break;
        case '/rename':
            fs.rename('hello2.txt', 'rename.txt', (err) => {
                if (!err) {
                    res.write('REnamed file to');
                    res.end();
                }

                console.log(err);
            })
            break;
        default:
            res.write('<a href="/">Go to Home Page </a>')
            res.end();
    }
})

server.listen(port, () => console
    .log(`Server is running on port port'${port}`));