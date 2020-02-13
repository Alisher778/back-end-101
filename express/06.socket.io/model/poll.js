const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  title: String,
  content: { type: String },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
  votes: [{ id: { type: Schema.Types.ObjectId, ref: 'Politician' }, vote: String }],
  totalVotes: { type: Number, default: 0 },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  unknown: { type: Number, default: 0 },
});

const Polls = mongoose.model('Poll', pollSchema);
module.exports = Polls;