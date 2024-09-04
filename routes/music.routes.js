const express = require("express");
const router = express.Router();
const authorization = require("./../middlewares/authorization");
const musicController = require("./../controllers/music.controller");

router
	.route("/")
	.get(
		[
			authorization.superAdmin,
			authorization.artistManager,
			authorization.artist,
		],
		musicController.getMusics
	)
	.post(authorization.artist, musicController.addMusic);

router
	.route("/:id")
	.get(authorization.artist, musicController.getMusic)
	.put(authorization.artist, musicController.updatMusic)
	.delete(authorization.artist, musicController.deleteMusic);

module.exports = router;
