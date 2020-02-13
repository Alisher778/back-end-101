const Agendas = require('../model/agenda');

module.exports = (io, socket) => {
  socket.on('fetchAgenda', (data) => {
    Agendas
      .find()
      .sort({ createdAt: -1 })
      .then(data => {
        io.emit('getAgenda', { success: true, data });
      })
      .catch(err => {
        console.log(err)
        io.emit('getAgenda', { success: false, msg: err.message, data: [] });
      })
  });
}