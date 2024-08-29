const express = require('express');
const router = express.Router();
const authentication = require('./../middlewares/authentication');

router.use('/auth', require('./auth.routes'));
router.use('/users', authentication, require('./user.routes'));
router.use('/artists', authentication, require('./artist.routes'));

module.exports = router;