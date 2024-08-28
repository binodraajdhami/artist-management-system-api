const express = require('express');
const router = express.Router();
const userController = require("./../controllers/user.controller");

router.route('/')
    .get(userController.getUsers)
    .post();

router.route('/:id')
    .get()
    .put()
    .delete()

module.exports = router;