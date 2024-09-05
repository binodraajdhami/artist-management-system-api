const prisma = require("./../configs/prisma.client.js");

async function createArtist(req, res, next) {
	try {
		const newArtist = await prisma.artist.create({
			data: {
				name: req.body.name,
				dob: new Date(req.body.dob),
				gender: req.body.gender,
				address: req.body.address,
				first_release_year: new Date(req.body.first_release_year),
				no_of_albums_release: parseInt(req.body.no_of_albums_release),
			},
		});

		res.status(200).json(newArtist);
	} catch (error) {
		next(error);
	}
}

async function getArtists(req, res, next) {
	console.log(req.query);
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

		const artists = await prisma.artist.findMany({
			take: limit,
			skip: skep,
		});

		const totalArtists = await prisma.artist.count();
		const totalPages = Math.ceil(totalArtists / limit);

		res.status(200).json({
			artists,
			metadata: {
				totalArtists,
				totalPages,
				currentPage: page,
				currentLimit: limit,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getArtist(req, res, next) {
	try {
		const artist = await prisma.artist.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		if (!artist) {
			return res.status(200).json({ msg: "Artist doesn't exist!" });
		}
		res.status(200).json({ artist });
	} catch (error) {
		next(error);
	}
}

async function updatArtist(req, res, next) {
	try {
		const artist = await prisma.artist.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});

		if (!artist) {
			return res.status(200).json({ msg: "Artist doesn't exist!" });
		}

		const updatedArtist = await prisma.artist.update({
			where: {
				id: artist.id,
			},
			data: {
				name: req.body.name ? req.body.name : artist.name,
				dob: req.body.dob ? new Date(req.body.dob) : artist.dob,
				gender: req.body.gender ? req.body.gender : artist.gender,
				address: req.body.address ? req.body.address : artist.address,
				first_release_year: req.body.first_release_year
					? new Date(req.body.first_release_year)
					: artist.first_release_year,
				no_of_albums_release: req.body.no_of_albums_release
					? req.body.no_of_albums_release
					: artist.no_of_albums_release,
			},
		});
		res.status(200).json(updatedArtist);
	} catch (error) {
		next(error);
	}
}

async function deleteArtist(req, res, next) {
	try {
		const artist = await prisma.artist.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		if (!artist) {
			return res.status(200).json({ msg: "Artist doesn't exist!" });
		}

		const deletedArtist = await prisma.artist.delete({
			where: { id: artist.id },
		});
		res.status(200).json(deletedArtist);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createArtist,
	getArtists,
	getArtist,
	updatArtist,
	deleteArtist,
};
