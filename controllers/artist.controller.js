const prisma = require("./../configs/prisma.client.js");

async function addArtist(req, res, next) {
    try {
        const newArtist = await prisma.artist.create({
            data: {
                user_id: req.loggedInUser,
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                first_release_year: req.body.first_release_year,
                no_of_albums_release: req.body.no_of_albums_release,
            }
        });
        res.status(200).json(newArtist);

    } catch (error) {
        next(error)
    }
}

async function getArtists(req, res, next) {
    try {
        const artists = await prisma.artist.findMany({});
        res.status(200).json(artists);
    } catch (error) {
        next(error)
    }
}

async function getArtist(req, res, next) {
    try {
        const artist = await prisma.artist.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!artist) {
            return res.status(200).json({ msg: "Artist doesn't exist!" });
        }
        res.status(200).json(artist);

    } catch (error) {
        next(error)
    }
}

async function updatArtist(req, res, next) {
    try {
        const artist = await prisma.artist.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!artist) {
            return res.status(200).json({ msg: "Artist doesn't exist!" });
        }

        const updatedArtist = await prisma.artist.update({
            where: {
                id: artist.id
            },
            data: {
                user_id: req.loggedInUser,
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                first_release_year: req.body.first_release_year,
                no_of_albums_release: req.body.no_of_albums_release,
            }
        });
        res.status(200).json(updatedArtist);

    } catch (error) {
        next(error)
    }
}

async function deleteArtist(req, res, next) {
    try {
        const artist = await prisma.artist.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!artist) {
            return res.status(200).json({ msg: "Artist doesn't exist!" });
        }

        const deletedArtist = await prisma.artist.delete({ where: { id: artist.id } })
        res.status(200).json(deletedArtist);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    addArtist,
    getArtists,
    getArtist,
    updatArtist,
    deleteArtist
}