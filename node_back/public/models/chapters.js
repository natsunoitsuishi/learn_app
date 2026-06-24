const {DataTypes} = require('sequelize');
const sequelize = require("../db");

const Chapters = sequelize.define(
    "Chapters",
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
            type: DataTypes.TEXT('long'),
            allowNull: false
        },

        video: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'course_id'
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
        tableName: "chapters",
        timestamps: false
    }
);

module.exports = Chapters;