const request = require("supertest")
const jwt = require("jsonwebtoken")

const app = require("../../src/app")
const factory = require("../factories")


describe("Auth tests", () => {
    beforeEach(async () => {
        await (require("../utils/truncate"))()
    })

    it("should authenticate with valid credentials", async () => {
        const user = await factory.create("User", {
            password: "245752236"
        })

        const response = await request(app)
            .post("/sessions")
            .send({
                "email": user.email,
                "senha": "245752236"
            })

        expect(response.status).toBe(202)
    })

    it("should not authenticate when user not found", async () => {
        const response = await request(app)
            .post("/sessions")
            .send({
                "email": "abc",
                "senha": "0987654321"
            })

        expect(response.status).toBe(401)
    })

    it("should not authenticate with invalid credentials", async () => {
        const response = await request(app)
            .post("/sessions")
            .send({
                email: "doug@doug.com.br",
                senha: "123456122"
            })

        expect(response.status).toBe(401)
    })

    it("should return a jwt token when authenticated", async () => {
        const user = await factory.create("User", {
            "password": "124711566"
        })

        const response = await request(app)
            .post("/sessions")
            .send({
                "email": user.email,
                "senha": "124711566"
            })

        expect(response.header).toHaveProperty("authorization")
    })

    it("should return a valid jwt token when authenticated", async () => {
        const user = await factory.create("User", {
            "password": "124711566"
        })

        const response = await request(app)
            .post("/sessions")
            .send({
                "email": user.email,
                "senha": "124711566"
            })

        const token = response.header["authorization"].split(" ")

        expect(!!jwt.verify(token[1], process.env.JWT_SECRET)).toBe(true)
    })

    it("should be able do access private routes when authenticated", async () => {
        const user = await factory.create("User")

        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", user.generateToken())

        expect(response.status).toBe(200)
    })

    it("should not be able do access private routes when not authenticated", async () => {
        const response = await request(app)
            .get("/dashboard")

        expect(response.status).toBe(401)
    })

    it("should not be able do access private routes when passing invalid jwt", async () => {
        const response = await request(app)
            .get("/dashboard")
            .set("authorization", "Bearer 123457852.5212265.21355748")

        expect(response.status).toBe(401)
    })
})
