const url = require('url');
const myUrl = new URL('http://phone:dog@blog.hello.js?name=123');

// console.log(url.domainToASCII('ҳелло.cом'))
// console.log(url.domainToUnicode('xn--e1amam59c.xn--c-xtbf'))
// console.log(url.fileURLToPath('file:///Library/CoreAnalytics/'))
// console.log(url.pathToFileURL('/Library/CoreAnalytics/'))
// console.log(url.format(myUrl, { auth: true, fragment: false }))

console.log(myUrl.search)