const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }], // Array of ObjectId
  genre: { type: String },
  releaseDate: { type: Date }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
