const Artist = require('../models/artist');

// Create an artist
exports.createArtist = async (req, res) => {
    const { name, genre, bio, birthDate } = req.body;

    try {
        const artist = new Artist({
            name,
            genre,
            bio,
            birthDate
        });
        await artist.save();
        res.status(201).json(artist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Get all artists
exports.getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Delete an artist
exports.deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json({ message: 'Artist deleted successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Update an artist
exports.updateArtist = async (req, res) => {
    const { name, genre, bio, birthDate } = req.body;

    try {
        const artist = await Artist.findByIdAndUpdate(
            req.params.id,
            { name, genre, bio, birthDate },
            { new: true } 
        );

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.json(artist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
