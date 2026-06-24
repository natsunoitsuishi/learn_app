const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "myapp_db",
    "root",
    "123",
    {
        host: "localhost",
        dialect: "mysql",
        logging: console.log
    }
);

module.exports = sequelize;