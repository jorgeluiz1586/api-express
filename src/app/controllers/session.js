const { User } = require("../models")

class Session {
    async store (req, res) {
        const { email, senha } = req.body

        const auth_user = await User.findOne({ where: { email } })

        if (!auth_user) {
            return res.status(401).json({ message: "Failed to authenticate"})
        }

        if (!(await auth_user.checkPassword(senha))) {
            return res.status(401).json({ message: "Failed to authenticate"})
        }

        res.status(202).setHeader("Authorization", auth_user.generateToken())
        await res.send()

    }
}

module.exports = new Session()
