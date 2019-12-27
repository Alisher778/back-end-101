const http = require('http');
const url = require('url')

const server = http.createServer((req, res) => {
    const { url: siteUrl } = req;
    const myUrl = new URL(siteUrl, 'http://localhost:3000');
    if (siteUrl === '/') {
        res.write('<a href="/about"><h1>Hello. Go to About Page</h1></a>');
        res.write('<b>Port ' + myUrl.port + '</b>')
        return res.end();
    } else if (siteUrl === '/get-info') {
        http.get('http://alitech.uz', (response) => {
            console.log(res);
            // res.write(data);
            // res.end();
            let myData = '';
            response.on('data', (data) => myData += data);
            response.on('end', () => {
                res.write(myData);
                res.end();
            });
        });
        console.log('Get method')
    } else if (siteUrl === '/post') {
        res.write(JSON.stringify(http.STATUS_CODES))
        res.end();
    } else if (siteUrl === '/end') {
        res.setHeader('Content-Type', 'application/json')
        res.write('{"name": "hello"}');

        server.close((err) => console.log(err, '------------'))
        res.end();
    } else if (siteUrl.startsWith('/user')) {
        const id = myUrl.searchParams.get('id')
        http.get('http://jsonplaceholder.typicode.com/users/' + id, (data) => {

            let newUser = {};
            data.on('data', (user) => {
                // console.log(user.toString());
                newUser = JSON.parse(user.toString()).address;
                // return { ...newUser, ...JSON.parse(user.toString()) }
            });
            data.on('end', (respond) => {
                res.setHeader('Content-Type', 'application/json');
                const d = JSON.stringify(newUser);
                console.group(newUser)
                res.write(`${JSON.stringify(newUser)}`);
                res.end();
            })

        })

    }
    else {
        res.write('<a href="/"><h1>HOME Page</h1></a>' + req.method);
        return res.end();
    }

});

// server.setTimeout(3000, () => console.log('I am out'));

server.listen(3000, () => console.log('Server is running'));