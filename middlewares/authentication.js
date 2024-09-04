const jwt = require("jsonwebtoken");
const configs = require("./../configs");
const prisma = require("./../configs/prisma.client");

module.exports = function (req, res, next) {
	let token;
	if (req.headers["x-access-token"]) {
		token = req.headers["x-access-token"];
	}
	if (req.headers["authorization"]) {
		token = req.headers["authorization"];
	}
	if (req.headers.token) {
		token = req.headers["authorization"];
	}
	if (req.query.token) {
		token = req.query["token"];
	}
	if (token) {
		jwt.verify(
			token,
			configs.app.jwtSecret,
			async function (err, verifiedUser) {
				if (err) {
					return next(err);
				}
				if (verifiedUser) {
					const user = await prisma.user.findUnique({
						where: {
							id: verifiedUser.id,
						},
					});

					if (!user) {
						return next({
							status: 404,
							msg: "User not found",
						});
					}

					req.loggedInUser = user;
					next();
				} else {
					next({
						status: 400,
						msg: "Token expired or verification failed",
					});
				}
			}
		);
	} else {
		res.status(400).json({
			msg: "Token not provided",
		});
	}
};
