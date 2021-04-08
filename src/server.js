const App = require("./app")


App.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.error(err)
        return
    }

    console.info("Servidor rodando...")
})
