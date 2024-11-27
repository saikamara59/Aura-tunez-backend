const path = require("path");
const Song = require("../models/song");
// const router = express.router();
// const express = require('express');

// Create a song

exports.createSong = async (req, res) => {
  const { title, artist, genre, releaseDate, image } = req.body;
  // let image = '';

  // if (req.file) {
  //     image = path.join('uploads', req.file.filename);
  // }

  try {
    const song = new Song({
      title,
      artist,
      genre,
      releaseDate,
      image,
    });
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artist", "name");
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate("artist");
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSong = async (req, res) => {
  const { title, artist, genre, releaseDate, image } = req.body;

  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, genre, releaseDate, image },
      { new: true }
    );

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
