const bcrypt = require("bcryptjs")

const { User } = require("../../src/app/models")

describe("User model test", () => {
    beforeEach(async () => {
        const truncate = require("../utils/truncate")
        await truncate()
    })

    it("It should encrypt user password on create", async () => {
        const user = await User.create({
            name: "Doug",
            email: "doug@la.com.br",
            password: "123456"
        })

        const compare = await bcrypt.compare("123456", user.password_hash)

        expect(compare).toBe(true)
    })
})
