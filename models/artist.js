const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }], 
  genre: { type: String },
  releaseDate: { type: Date }
});

module.exports = mongoose.model('Song', songSchema);
