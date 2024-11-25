const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    genre: { type: String },
    birthDate: { type: String }
});


const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: [ artistSchema],
    // artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    genre: { type: String },
    releaseDate: { type: String },
    image: { type: String},
});


module.exports = mongoose.model('Song', songSchema);