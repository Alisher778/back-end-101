const mongoose = require('mongoose');
const { Schema } = mongoose;

const agendaSchema = new Schema({
  title: String,
  content: { type: String },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
  isActive: { type: Boolean, default: false }
});

const Agendas = mongoose.model('Agenda', agendaSchema);
module.exports = Agendas;