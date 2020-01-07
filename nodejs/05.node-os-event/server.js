const http = require('http');
const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('haha', () => {
    console.log('Hahahhahah', eventEmitter.eventNames())
});
eventEmitter.once('bye', () => {
    console.log('bye bye');

    eventEmitter.emit('haha');
    // eventEmitter.off('haha', () => console.log('haha is removed'));
});
eventEmitter.removeAllListeners('haha', () => console.log('haha is removed'));
eventEmitter.prependListener('mango', () => console.log('Mango'));

eventEmitter.on('error', () => {
    console.log('dkajsgjh')
});

eventEmitter.on('newListener', () => console.log('I am firing before events', eventEmitter.eventNames()))
const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            eventEmitter.emit('haha');
            eventEmitter.emit('mango')
            eventEmitter.emit('bye');
            eventEmitter.on('removeListener', () => console.log('remove'))
            console.log(eventEmitter.eventNames())

            res.write('Hello Home page');
            res.end();
            break;
        default:
            eventEmitter.emit('haha');
            console.log(2);
            eventEmitter.emit('bye');
            res.write('Error Page');
            res.end();
            break;
    }
}).listen(3000, () => console.log('App is running oon localhost:3000'));
