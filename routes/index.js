const express = require('express');
const router = express.Router();
const authentication = require('./../middlewares/authentication');

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/artists', require('./artist.routes'));
router.use('/musics', require('./music.routes'));

module.exports = router;