const express = require("express");
const multer = require("multer");
const router = express.Router();
const authorization = require("./../middlewares/authorization");
const artistController = require("./../controllers/artist.controller");

const myStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().getTime() + "-" + file.originalname);
	},
});

function myFileFilter(req, file, cb) {
	if (file.mimetype === "text/csv") {
		cb(null, true);
	} else {
		req.fileError = "Invalid file type. Only CSV files are allowed.";
		cb(null, false);
	}
}

const upload = multer({
	storage: myStorage,
	fileFilter: myFileFilter,
});

router
	.route("/")
	.get(authorization.superAdminArtistManager, artistController.getArtists)
	.post(authorization.artistManager, artistController.createArtist);

router
	.route("/:id")
	.get(authorization.artistManager, artistController.getArtist)
	.put(authorization.artistManager, artistController.updatArtist)
	.delete(authorization.artistManager, artistController.deleteArtist);

router
	.route("/import/csv")
	.post(
		authorization.artistManager,
		upload.single("csv"),
		artistController.importArtistToCSV
	);

router
	.route("/export/csv")
	.get(
		authorization.superAdminArtistManager,
		artistController.exportArtistToCSV
	);

module.exports = router;
