const prisma = require("./../configs/prisma.client.js");

async function addMusic(req, res, next) {
	try {
		const newArtist = await prisma.music.create({
			data: {
				artist_id: req.body.artist_id,
				title: req.body.title,
				album_name: req.body.album_name,
				genre: req.body.genre,
			},
		});
		res.status(200).json(newArtist);
	} catch (error) {
		next(error);
	}
}

async function getMusics(req, res, next) {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		if (page < 0) {
			page = 1;
		}

		if (limit < 0 || limit > 100) {
			limit = 10;
		}

		const skep = (page - 1) * limit;

		const musics = await prisma.music.findMany({
			take: limit,
			skip: skep,
			include: {
				Artist: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		const totalMusics = await prisma.artist.count();
		const totalPages = Math.ceil(totalMusics / limit);

		res.status(200).json({
			musics,
			metadata: {
				totalMusics,
				totalPages,
				currentPage: page,
				currentLimit: limit,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getMusic(req, res, next) {
	try {
		const music = await prisma.music.findUnique({
			where: {
				id: Number(req.params.id),
			},
			include: {
				Artist: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
		if (!music) {
			return res.status(200).json({ msg: "Music doesn't exist!" });
		}
		res.status(200).json({ music });
	} catch (error) {
		next(error);
	}
}

async function updatMusic(req, res, next) {
	try {
		const music = await prisma.music.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});

		if (!music) {
			return res.status(200).json({ msg: "Music doesn't exist!" });
		}

		const updatedMusic = await prisma.music.update({
			where: {
				id: music.id,
			},
			data: {
				artist_id: req.body.artist_id,
				title: req.body.title,
				album_name: req.body.album_name,
				genre: req.body.genre,
			},
		});
		res.status(200).json(updatedMusic);
	} catch (error) {
		next(error);
	}
}

async function deleteMusic(req, res, next) {
	try {
		const music = await prisma.music.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		if (!music) {
			return res.status(200).json({ msg: "Music doesn't exist!" });
		}

		const deletedMusic = await prisma.music.delete({
			where: { id: Number(req.params.id) },
		});
		res.status(200).json(deletedMusic);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	addMusic,
	getMusics,
	getMusic,
	updatMusic,
	deleteMusic,
};
