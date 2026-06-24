const {DataTypes} = require('sequelize');
const sequelize = require("../db");

const Courses = sequelize.define(
    "Courses",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },

        recommended: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        introductory: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        likeCount: {
            type: DataTypes.INTEGER,
            field: 'like_count',
            allowNull: false
        },

        chaptersCount: {
            type: DataTypes.INTEGER,
            field: 'chapters_count',
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false
        },

        categoryId: {
            type: DataTypes.INTEGER,
            field: 'category_id',
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
        tableName: "courses",
        timestamps: false
    }
);

Courses.associate = function(models) {
    Courses.belongsTo(models.Categories, {
        foreignKey: 'category_id',
        as: 'category'
    });
    Courses.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
    });
};


module.exports = Courses;