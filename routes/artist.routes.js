const express = require("express");
const router = express.Router();
const authorization = require("./../middlewares/authorization");
const artistController = require("./../controllers/artist.controller");

router
	.route("/")
	.get(authorization.superAdminArtistManager, artistController.getArtists)
	.post(authorization.artistManager, artistController.createArtist);

router
	.route("/:id")
	.get(authorization.artistManager, artistController.getArtist)
	.put(authorization.artistManager, artistController.updatArtist)
	.delete(authorization.artistManager, artistController.deleteArtist);

module.exports = router;
