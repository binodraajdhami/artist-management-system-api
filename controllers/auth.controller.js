const bcrypt = require('bcrypt');
const prisma = require("./../configs/prisma.client");

async function register(req, res, next) {
    try {
        const isUserExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (isUserExist) {
            return res.status(400).json({ msg: "User is alreary exist" })
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address
            }
        });
        res.status(200).json(newUser);

    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Email or Username!" })
        }

        res.status(200).json(user);


    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}