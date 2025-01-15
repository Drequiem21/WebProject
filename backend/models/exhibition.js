const mongoose = require('mongoose');

const ExhibitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Exhibition', ExhibitionSchema);