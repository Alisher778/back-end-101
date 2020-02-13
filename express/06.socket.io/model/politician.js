const mongoose = require('mongoose');
const { Schema } = mongoose;

const politicianSchema = new Schema({
  fullName: String,
  party: String,
  email: String,
  phone: String,
  address: String,
  region: String,
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Politicians = mongoose.model('politician', politicianSchema);
module.exports = Politicians;