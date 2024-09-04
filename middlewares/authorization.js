function superAdmin(req, res, next) {
	if (req.loggedInUser.role === "SUPER_ADMIN") {
		next();
	} else {
		next({
			msg: `${req.loggedInUser.role} : Unauthorized`,
			status: 401,
		});
	}
}

function artistManager(req, res, next) {
	if (req.loggedInUser.role === "ARTIST_MANAGER") {
		next();
	} else {
		next({
			msg: `${req.loggedInUser.role} : Unauthorized`,
			status: 401,
		});
	}
}

function artist(req, res, next) {
	if (req.loggedInUser.role === "ARTIST") {
		next();
	} else {
		next({
			msg: `${req.loggedInUser.role} : Unauthorized`,
			status: 401,
		});
	}
}

function superAdminArtistManager(req, res, next) {
	if (
		req.loggedInUser.role === "SUPER_ADMIN" ||
		req.loggedInUser.role === "ARTIST_MANAGER"
	) {
		next();
	} else {
		next({
			msg: `${req.loggedInUser.role} : Unauthorized`,
			status: 401,
		});
	}
}

function superAdminArtistManagerArtist(req, res, next) {
	if (
		req.loggedInUser.role === "SUPER_ADMIN" ||
		req.loggedInUser.role === "ARTIST_MANAGER" ||
		req.loggedInUser.role === "ARTIST"
	) {
		next();
	} else {
		next({
			msg: `${req.loggedInUser.role} : Unauthorized`,
			status: 401,
		});
	}
}

module.exports = {
	superAdmin,
	artistManager,
	artist,
	superAdminArtistManager,
	superAdminArtistManagerArtist,
};
