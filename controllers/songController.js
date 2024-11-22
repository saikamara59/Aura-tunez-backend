const path = require('path');
const Song = require('../models/song');


// Create a song
exports.createSong = async (req, res) => {
    const { title, artist, genre, releaseDate } = req.body;
    let image = null;

    if (req.file) {
        image = path.join('uploads', req.file.filename);
    }

    try {
        const song = new Song({
            title,
            artist,
            genre,
            releaseDate,
            image
        });
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Get all songs
// Populate only the 'name' field of the artist
exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate('artist', 'name');
        res.json(songs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


// Delete a song
exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Update a song
exports.updateSong = async (req, res) => {
    const { title, artist, genre, releaseDate } = req.body;
    let image = null;

    if (req.file) {
        image = path.join('uploads', req.file.filename);
    }

    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { title, artist, genre, releaseDate, image },
            { new: true } // return the updated document
        );

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};