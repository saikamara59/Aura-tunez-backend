const Artist = require("../models/artist");

exports.createArtist = async (req, res) => {
  const { name, genre, bio, birthDate } = req.body;

  try {
    const artist = new Artist({
      name,
      genre,
      bio,
      birthDate,
    });
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json({ message: "Artist deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  const { name, genre, bio, birthDate } = req.body;

  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name, genre, bio, birthDate },
      { new: true }
    );

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
