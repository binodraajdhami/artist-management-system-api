const prisma = require("./../configs/prisma.client.js");

async function getUsers(req, res, next) {
    try {
        const response = await prisma.user.findMany({});
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers
}