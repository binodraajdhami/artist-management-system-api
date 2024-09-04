const express = require("express");
const router = express.Router();
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

router.use("/auth", require("./auth.routes"));
router.use(
	"/users",
	authentication,
	authorization.superAdmin,
	require("./user.routes")
);
router.use("/artists", authentication, require("./artist.routes"));
router.use("/musics", authentication, require("./music.routes"));

module.exports = router;
