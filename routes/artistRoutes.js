const express = require("express");
const artistController = require("../controllers/artistController");
const router = express.Router();

router.post("/add", artistController.createArtist);

router.get("/", artistController.getArtists);

router.delete("/:id", artistController.deleteArtist);

router.put("/:id", artistController.updateArtist);

module.exports = router;
