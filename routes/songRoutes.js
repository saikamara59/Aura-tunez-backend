const express = require('express');
const songController = require('../controllers/songController');
const router = express.Router();

// Route for creating a song
router.post('/add', songController.createSong);

// Route for getting all songs
router.get('/', songController.getSongs);

router.get('/:id',songController.getSongById);

// Route for deleting a song
router.delete('/:id', songController.deleteSong);

// Route for updating a song
router.put('/:id/update', songController.updateSong);



module.exports = router;
