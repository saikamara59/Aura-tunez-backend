const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    genre: { type: String },
    birthDate: { type: String }
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
