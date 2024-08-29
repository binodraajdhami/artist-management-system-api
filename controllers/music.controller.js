const prisma = require("./../configs/prisma.client.js");

async function addMusic(req, res, next) {
    try {
        const newArtist = await prisma.music.create({
            data: {
                artist_id: req.body.artist_id,
                title: req.body.title,
                album_name: req.body.album_name,
                genre: req.body.genre
            }
        })
        res.status(200).json(newArtist);

    } catch (error) {
        next(error)
    }
}

async function getMusics(req, res, next) {
    try {
        const musics = await prisma.music.findMany({});

        res.status(200).json(musics);

    } catch (error) {
        next(error)
    }
}

async function getMusic(req, res, next) {
    try {
        const music = await prisma.music.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!music) {
            return res.status(200).json({ msg: "Music doesn't exist!" });
        }
        res.status(200).json(artist);

    } catch (error) {
        next(error)
    }
}

async function updatMusic(req, res, next) {
    try {
        const music = await prisma.music.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!music) {
            return res.status(200).json({ msg: "Music doesn't exist!" });
        }

        const updatedMusic = await prisma.music.update({
            where: {
                id: music.id
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
        res.status(200).json(updatedMusic);

    } catch (error) {
        next(error)
    }
}

async function deleteMusic(req, res, next) {
    try {
        const music = await prisma.music.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!music) {
            return res.status(200).json({ msg: "Music doesn't exist!" });
        }

        const deletedMusic = await prisma.music.delete({ where: { id: prisma.music.id } })
        res.status(200).json(deletedMusic);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    addMusic,
    getMusics,
    getMusic,
    updatMusic,
    deleteMusic
}