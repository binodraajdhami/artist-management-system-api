const bcrypt = require("bcrypt");
const prisma = require("./../configs/prisma.client.js");

async function getUsers(req, res, next) {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		if (page < 0) {
			page = 1;
		}

		if (limit < 0 || limit > 100) {
			limit = 10;
		}

		const skep = (page - 1) * limit;

		const users = await prisma.user.findMany({
			take: limit,
			skip: skep,
		});

		const totalUsers = await prisma.user.count();
		const totalPages = Math.ceil(totalUsers / limit);

		res.status(200).json({
			users,
			metadata: {
				totalUsers,
				totalPages,
				currentPage: page,
				currentLimit: limit,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getUser(req, res, next) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		if (!user) {
			return res.status(200).json({ msg: "User doesn't exist!" });
		}
		res.status(200).json({
			user,
		});
	} catch (error) {
		next(error);
	}
}

async function updatUser(req, res, next) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});

		if (!user) {
			return res.status(200).json({ msg: "User doesn't exist!" });
		}

		const existEmail = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (existEmail.email !== user.email) {
			return res
				.status(200)
				.json({ msg: "Email is used by another user!" });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				first_name: req.body.first_name
					? req.body.first_name
					: user.first_name,
				last_name: req.body.last_name
					? req.body.last_name
					: user.last_name,
				email: req.body.email ? req.body.email : user.email,
				phone: req.body.phone ? req.body.phone : user.phone,
				dob: req.body.dob ? new Date(req.body.dob) : user.dob,
				gender: req.body.gender ? req.body.gender : user.gender,
				role: req.body.role ? req.body.role : userrole,
				address: req.body.address ? req.body.address : user.address,
				password: req.body.password
					? bcrypt.hashSync(req.body.password, 10)
					: user.password,
			},
		});
		res.status(200).json({ user: updatedUser });
	} catch (error) {
		next(error);
	}
}

async function deleteUser(req, res, next) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		if (!user) {
			return res.status(200).json({ msg: "User doesn't exist!" });
		}

		const deletedUser = await prisma.user.delete({
			where: { id: user.id },
		});
		res.status(200).json({ user: deletedUser });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getUsers,
	getUser,
	updatUser,
	deleteUser,
};
