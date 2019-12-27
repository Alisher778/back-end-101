const http = require('http');
const { URLSearchParams, URL } = require('url');

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === '/') {
        res.write('dakjshkjfas');
    } else if (url === '/contact') {
        res.write('contact');
    } else {
        res.write('Hahahha Page');
    }
    console.log(server.ref())
    res.end();



}).listen(3000, () => console.log('Server is running'))

const url = new URL('http://alitch.uz/?name=hello&age99');
const params = new URLSearchParams('name=baba&age=89');
console.log(params.set('hello', 'salom'))
params.sort()
params.append('hello', 9999)
console.log(params.toString())
