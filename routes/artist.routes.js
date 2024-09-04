const express = require("express");
const router = express.Router();
const authorization = require("./../middlewares/authorization");
const artistController = require("./../controllers/artist.controller");

router
	.route("/")
	.get(
		[authorization.superAdmin, authorization.artistManager],
		artistController.getArtists
	)
	.post(authorization.artistManager, artistController.addArtist);

router
	.route("/:id")
	.get(authorization.artistManager, artistController.getArtist)
	.put(authorization.artistManager, artistController.updatArtist)
	.delete(authorization.artistManager, artistController.deleteArtist);

module.exports = router;
