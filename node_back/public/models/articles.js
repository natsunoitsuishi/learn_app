const {DataTypes} = require('sequelize');
const sequelize = require("../db");

const Articles = sequelize.define(
    "Categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        content: {
            type: DataTypes.STRING,
            allowNull: false
        },

        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },

        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        }
    },
    {
        tableName: "articles",
        timestamps: false
    }
);

module.exports = Articles;