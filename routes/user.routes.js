const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user.controller");

router.route("/").get(userController.getUsers);

router
	.route("/:id")
	.get(userController.getUser)
	.put(userController.updatUser)
	.delete(userController.deleteUser);

module.exports = router;
