const {DataTypes} = require('sequelize');
const sequelize = require("../db");

const Users = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING
        },

        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },

        sex: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        company: {
            type: DataTypes.STRING,
            allowNull: false
        },

        bio: {
            type: DataTypes.TEXT
        },

        role: {
            type: DataTypes.TINYINT
        },

        isTeacher: {
            type: DataTypes.BOOLEAN
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
        tableName: "users",
        timestamps: false
    }
);

module.exports = Users;