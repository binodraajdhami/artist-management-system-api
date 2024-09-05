const fs = require("fs").promises;
const csvtojson = require("csvtojson");
const exceljs = require("exceljs");
const prisma = require("./../configs/prisma.client.js");

async function exportArtistToCSV(req, res, next) {
	try {
		const workbook = new exceljs.Workbook();
		const worksheet = workbook.addWorksheet("All Artists");

		worksheet.columns = [
			{ header: "SN", key: "sn" },
			{ header: "Name", key: "name" },
			{ header: "Date of Birth", key: "dob" },
			{ header: "Gender", key: "gender" },
			{ header: "Address", key: "address" },
			{ header: "First Release Year", key: "first_release_year" },
			{ header: "No of Albums Release", key: "no_of_albums_release" },
			{ header: "Created At", key: "created_at" },
			{ header: "Updated At", key: "updated_at" },
		];

		const artistsData = await prisma.artist.findMany({});
		artistsData.forEach((artist, i) => {
			artist.sn = i + 1;
			worksheet.addRow(artist);
		});

		worksheet.getRow(1).eachCell((cell) => {
			cell.font = { bold: true };
		});

		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
		);

		res.setHeader(
			"Content-Disposition",
			`attachment; filename=artists.csv`
		);

		return workbook.csv.write(res).then(() => {
			res.status(200);
		});
	} catch (error) {
		next(error);
	}
}

async function importArtistToCSV(req, res, next) {
	try {
		if (req.fileError) return next(req.fileError);

		// Convert CSV file to JSON
		const response = await csvtojson().fromFile(req.file.path);
		const csvDatas = [];

		// push to csvDatas array
		for (let i = 0; i < response.length; i++) {
			csvDatas.push({
				name: response[i].name,
				dob: new Date(response[i].dob),
				gender: response[i].gender,
				address: response[i].address,
				first_release_year: new Date(response[i].first_release_year),
				no_of_albums_release: Number(response[i].no_of_albums_release),
			});
		}

		// createMany
		const newArtists = await prisma.artist.createMany({
			data: csvDatas,
			skipDuplicates: true, // Optional: skips duplicates based on unique constraints
		});

		// Unlink (delete) the file after processing
		await fs.unlink(req.file.path);

		res.status(200).json(newArtists);
	} catch (error) {
		// If an error occurs, try to unlink the file if it exists
		if (req.file && req.file.path) {
			await fs
				.unlink(req.file.path)
				.catch((err) => console.error("File unlink error: ", err));
		}
		next(error);
	}
}

async function createArtist(req, res, next) {
	try {
		const newArtist = await prisma.artist.create({
			data: {
				name: req.body.name,
				dob: new Date(req.body.dob),
				gender: req.body.gender,
				address: req.body.address,
				first_release_year: new Date(req.body.first_release_year),
				no_of_albums_release: Number(req.body.no_of_albums_release),
			},
		});

		res.status(200).json(newArtist);
	} catch (error) {
		next(error);
	}
}

async function getArtists(req, res, next) {
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
				id: Number(req.params.id),
			},
			include: {
				Music: {
					select: {
						title: true,
					},
				},
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
				id: Number(req.params.id),
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
					? Number(req.body.no_of_albums_release)
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
				id: Number(req.params.id),
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
	exportArtistToCSV,
	importArtistToCSV,
	createArtist,
	getArtists,
	getArtist,
	updatArtist,
	deleteArtist,
};
