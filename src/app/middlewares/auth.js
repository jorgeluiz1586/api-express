const jwt = require("jsonwebtoken")
const { promisify } = require("util")

module.exports = async (req, res, next) => {
    const token = req.headers["authorization"]

    if (!token) {
        return res.status(401).send()
    }

    const [, userJwt] = token.split(" ")

    console.log("Jwt", userJwt)
    try {
        const decoded = await promisify(jwt.verify)(userJwt, process.env.JWT_SECRET)

        req.userId = decoded._id
        return next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid/Expired token"})
    }

}
