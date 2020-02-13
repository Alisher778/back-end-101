const Agendas = require('../model/agenda');
const Polls = require('../model/poll');

module.exports = (io, socket) => {
  socket.on('createPoll', (data) => {
    const { _id, ...newValue } = data;
    Polls
      .findByIdAndUpdate(_id, { $set: newValue }, { upsert: true, new: true })
      .then(data => {
        io.sockets.emit('sendPoll', { success: true, data, active: true })
      })
      .catch(err => {
        io.emit('sendPoll', { success: false, msg: err.message, data: [], active: false });
      })
  });

  socket.on('updatePoll', (data) => {
    const { _id, vote } = data;
    Polls
      .findByIdAndUpdate(_id, { $addToSet: { votes: vote } }, { new: true })
      .then(data => {
        io.sockets.emit('sendResult', { success: true, data })
      })
      .catch(err => {
        io.emit('sendResult', { success: false, msg: err.message, data: [], });
      })
  });

  socket.on('getLatestPoll', (data) => {
    Polls
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .then(data => {
        io.sockets.emit('sendResult', { success: true, data: data[0] })
      })
      .catch(err => {
        io.emit('sendResult', { success: false, msg: err.message, data: [], });
      })
  });
}