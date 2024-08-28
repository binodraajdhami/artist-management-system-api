const bcrypt = require('bcrypt');
const prisma = require("./../configs/prisma.client.js");

async function getUsers(req, res, next) {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

async function getUser(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!user) {
            return res.status(200).json({ msg: "User doesn't exist!" });
        }
        res.status(200).json(user);

    } catch (error) {
        next(error)
    }
}

async function updatUser(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!user) {
            return res.status(200).json({ msg: "User doesn't exist!" });
        }

        const existEmail = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (existEmail.email !== user.email) {
            return res.status(200).json({ msg: "Email is used by another user!" });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                password: !req.body.password ? user.password : bcrypt.hashSync(req.body.password, 10)
            }
        });
        res.status(200).json(updatedUser);

    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (!user) {
            return res.status(200).json({ msg: "User doesn't exist!" });
        }

        const deletedUser = await prisma.user.delete({ where: { id: user.id } })
        res.status(200).json(deletedUser);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUsers,
    getUser,
    updatUser,
    deleteUser
}