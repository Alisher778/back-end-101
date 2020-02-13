const Agendas = require('../model/agenda');

module.exports = (io, socket) => {
  socket.on('newAgenda', (data) => {
    Agendas
      .create(data)
      .then(res => {
        io.emit('agendaStatus', { success: true, msg: 'Muvaffaqiyatli bajarildi' })
      })
      .catch(err => {
        console.log(err)
        io.emit('agendaStatus', { success: false, msg: err.message });
      })
  });

  // edit agenda
  socket.on('getEditAgenda', (id) => {
    Agendas
      .findById(id)
      .then(data => {
        io.emit('sendEditAgenda', { data: data })
      })
      .catch(err => {
        io.emit('sendEditAgenda', { success: false, msg: err.message });
      })
  });

  // edit agenda
  socket.on('editAgenda', (data) => {
    console.log(data);

    Agendas
      .findByIdAndUpdate(data._id, { $set: { title: data.title, content: data.content, updatedAt: Date.now() } }, { new: true })
      .then(res => {
        io.emit('sendEditAgenda', { data: { success: true, msg: 'Muvaffaqiyatli bajarildi' } })
      })
      .catch(err => {
        socket.emit('sendEditAgenda', { data: { success: false, msg: err.message } });
      })
  });

  socket.on('deleteAgenda', ({ id }) => {
    Agendas
      .findByIdAndDelete(id)
      .then(res => {
        io.emit('agendaStatus', { success: true, msg: 'Muvaffaqiyatli bajarildi' });
        io.emit('fetchAgenda');
      })
      .catch(err => {
        console.log(err)
        io.emit('agendaStatus', { success: false, msg: err.message });
      })
  });
}