const { sequelize } = require("../../src/app/models/")


module.exports = () => {
    return Promise.all(Object.keys(sequelize.models).map(modelName => {
        return sequelize.models[modelName].destroy({ truncate: true, force: true })
    }))
}
