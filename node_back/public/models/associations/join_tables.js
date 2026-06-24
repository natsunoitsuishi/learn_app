const Courses = require('../courses');
const Categories = require('../categories');
const Users = require('../users');
const Articles = require('../articles');
const Chapters = require('../chapters');

Courses.belongsTo(Categories, {
    foreignKey: 'category_id',
    as: 'course_category'
});

Courses.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'course_user'
});

Chapters.belongsTo(Courses, {
    foreignKey: 'course_id',
    as: 'chapter_course'
})

module.exports = { Courses, Categories, Users, Articles, Chapters };