const express = require('express');
const songController = require('../controllers/songController');
const router = express.Router();

// Route for creating a song
router.post('/', songController.createSong);

// Route for getting all songs
router.get('/', songController.getSongs);

// Route for deleting a song
router.delete('/:id', songController.deleteSong);

// Route for updating a song
router.put('/:id', songController.updateSong);

module.exports = router;
