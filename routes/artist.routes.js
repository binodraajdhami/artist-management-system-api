const express = require('express');
const router = express.Router();
const artistController = require("./../controllers/artist.controller");

router.route('/')
    .get(artistController.getArtists)
    .post(artistController.addArtist)

router.route('/:id')
    .get(artistController.getArtist)
    .put(artistController.updatArtist)
    .delete(artistController.deleteArtist)

module.exports = router;