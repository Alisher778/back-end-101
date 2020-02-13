const Agendas = require('../model/agenda');

module.exports = (io, socket) => {
  socket.on('writePoll', (data) => {
    console.log(id);

    Agendas
      .findById(id)
      .then(data => {
        io.sockets.emit('sendAgenda', { success: true, data, active: true })
        // io.emit('sendAgenda', { success: true, data });
      })
      .catch(err => {
        console.log(err)
        io.emit('sendAgenda', { success: false, msg: err.message, data: [], active: false });
      })
  });
}