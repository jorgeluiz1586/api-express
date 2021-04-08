require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.dev" : ".env"
})

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT || "postgres",
  "storage": "./tests/data.sqlite",
  "dialectOptions": {
    "ssl": false
  },
  "port": "15432",
  "logging": false,
  "define": {
    "timestamps": true,
    "underscored": true,
    "underscoredAll": true
  }
}
