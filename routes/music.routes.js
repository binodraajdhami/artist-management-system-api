const express = require('express');
const router = express.Router();
const musicController = require("./../controllers/music.controller");

router.route('/')
    .get(musicController.getMusics)
    .post(musicController.addMusic)

router.route('/:id')
    .get(musicController.getMusic)
    .put(musicController.updatMusic)
    .delete(musicController.deleteMusic)

module.exports = router;