const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    genre: { type: String },
    birthDate: { type: Date }
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
