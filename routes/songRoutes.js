const express = require("express");
const songController = require("../controllers/songController");
const router = express.Router();

router.post("/add", songController.createSong);

router.get("/", songController.getSongs);

router.get("/:id", songController.getSongById);

router.delete("/:id", songController.deleteSong);

router.put("/:id/update", songController.updateSong);

module.exports = router;
