const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

// Route for creating an artist
router.post('/add', artistController.createArtist);

// Route for getting all artists
router.get('/', artistController.getArtists);

// Route for deleting an artist
router.delete('/:id', artistController.deleteArtist);

// Route for updating an artist
router.put('/:id', artistController.updateArtist);

module.exports = router;