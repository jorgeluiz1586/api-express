const Router = require("express").Router()

const authMiddleware = require("../app/middlewares/auth")

// importação de rotas ao projeto
Router.post("/sessions", async (req, res, next) => {
    const Session = require("../app/controllers/session")

    await Session.store(req, res)
})

Router.get("/dashboard", authMiddleware, async (req, res, next) => {
   return res.status(200).send()
})

module.exports = Router
