import socket from 'socket.io-client';
const io = socket('http://localhost:8000/');

export default io;