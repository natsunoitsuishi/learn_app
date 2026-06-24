const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();

const { Courses, Categories, Users, Articles, Chapters} =
    require('../public/models/associations/join_tables');

const { validateRegister, handleValidationErrors } = require('../public/validate')

const jwt = require('jsonwebtoken');

/**
 * POST /auth/sign_up
 * 注册
 */
router.post('/auth/sign_up', ...validateRegister, handleValidationErrors,
    async function(req, res) {
      try {
        const { email, username, nickname, password,
          avatar = 'https://bing.com', sex = 0,
          company = 'Google', bio = '工程师',
          role = 0, isTeacher = 1 } = req.body;

        const [existingEmail, existingUsername] = await Promise.all([
          Users.findOne({ where: { email } }),
          Users.findOne({ where: { username } })
        ]);

        if (existingEmail) {
          return res.status(400).json({
            status: false,
            message: '该邮箱已被注册'
          });
        }

        if (existingUsername) {
          return res.status(400).json({
            status: false,
            message: '该用户名已被使用'
          });
        }

        const user = await Users.create({
          email,
          username,
          nickname,
          password,
          avatar,
          sex,
          company,
          bio,
          role,
          isTeacher
        });

        await user.save();

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
          status: true,
          message: '创建用户成功。',
          data: { token }
        });

      } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({
          status: false,
          message: '服务器错误，请稍后重试'
        });
      }
    }
);


/**
  * GET /search
  * 搜索课程接口
  */
router.get('/search', async function(req, res, next) {
  try {
    const { q = '', page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (currentPage - 1) * pageSize;

    const whereCondition = {};
    if (q && q.trim()) {
      whereCondition.name = {
        [Op.like]: `%${q.trim()}%`
      };
    }

    let { count, rows: courses } = await Courses.findAndCountAll({
      where: whereCondition,
      attributes: [
          "id",
          "createdAt",
          "updatedAt",
          "name",
          "image",
          "recommended",
          "introductory",
          "likeCount",
          "chaptersCount",
          "categoryId",
          "userId"
      ],
      include: [
        {
          model: Categories,
          as: 'course_category',
          attributes: ['id', 'name']
        },
        {
          model: Users,
          as: 'course_user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company']
        }
      ],
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    courses = courses.map((course) => {
      const data = course.toJSON();
      const result = {
        ...data,
        user: course.course_user,
        category: course.course_category,
      }
      delete result.course_category;
      delete result.course_user;
      return result;
    });

    res.send({
      status: true,
      message: '查询课程列表成功',
      data: {
        courses: courses,
        pagination: {
          page: currentPage,
          limit: pageSize,
          total: count
        }
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /
 * 搜索首页接口
 */
router.get('/', async function(req, res, next) {
  try {
    let { count, rows: courses } = await Courses.findAndCountAll({
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "name",
        "image",
        "recommended",
        "introductory",
        "likeCount",
        "chaptersCount",
        "categoryId",
        "userId"
      ],
      include: [
        {
          model: Categories,
          as: 'course_category',
          attributes: ['id', 'name']
        },
        {
          model: Users,
          as: 'course_user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company']
        }
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    courses = courses.map((course) => {
      const data = course.toJSON();
      const result = {
        ...data,
        user: course.course_user,
        category: course.course_category,
      }
      delete result.course_category;
      delete result.course_user;
      return result;
    });

    const recommendedCourses
        = courses.filter(course => course.recommended === 1);

    const introductoryCourses
        = courses.filter(course => course.introductory === 1);

    const likesCourses
        = courses.filter(course => course.likeCount > 0);

    res.send({
      status: true,
      message: '查询课程列表成功',
      data: {
        recommendedCourses,
        introductoryCourses,
        likesCourses
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /categories
 * 搜索分类接口
 */
router.get('/categories', async function(req, res, next) {
  try {
    const { count, rows: categories } = await Categories.findAndCountAll({
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "name",
        "rank"
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    res.send({
      status: true,
      message: '查询分类成功。',
      data: {
        categories: categories
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /categories/:id
 * 根据ID查询单个分类
 */
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let { count, rows: courses } = await Courses.findAndCountAll({
      where: {
        categoryId: id
      },
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "name",
        "image",
        "recommended",
        "introductory",
        "likeCount",
        "chaptersCount",
        "categoryId",
        "userId"
      ],
      include: [
        {
          model: Categories,
          as: 'course_category',
          attributes: ['id', 'name']
        },
        {
          model: Users,
          as: 'course_user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company']
        }
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    courses = courses.map((course) => {
      const data = course.toJSON();
      const result = {
        ...data,
        user: course.course_user,
        category: course.course_category,
      }
      delete result.course_category;
      delete result.course_user;
      return result;
    });

    res.send({
      status: true,
      message: '查询课程列表成功。',
      data: {
        courses: courses
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /articles
 * 查询通知列表
 */
router.get('/articles', async function(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (currentPage - 1) * pageSize;

    const { count, rows: articles } = await Articles.findAndCountAll({
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "title"
      ],
      limit: pageSize,
      offset: offset,
      subQuery: false
    });

    res.send({
      status: true,
      message: '查询文章列表成功',
      data: {
        articles: articles,
        pagination: {
          page: currentPage,
          limit: pageSize,
          total: count
        }
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /articles/{id}
 * 查询通知详情
 */
router.get('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { count, rows: articles } = await Articles.findAndCountAll({
      where: {
        id: id
      },
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "title",
        "content"
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    res.send({
      status: true,
      message: '查询文章详情成功。',
      data: {
        articles: articles[0]
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /settings
 * 查询系统信息
 */
router.get('/settings', async (req, res) => {
  res.send({
    status: true,
    message: '查询系统信息成功。',
    data: {
      setting: {
        id: 1,
        createdAt: "2026-01-01 08:00:00",
        updatedAt: "2026-01-01 08:00:00",
        name: "长乐未央 - 快乐的程序员社区",
        icp: "鄂ICP备13016268号-11",
        copyright: "© 2013-2026 Changle Weiyang Inc. All Rights Reserved."
      }
    }
  });
})

/**
 * GET /teachers/{id}
 * 查询教师信息
 */
router.get('/teachers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id, {
      where: {
        isTeacher: 1
      },
      attributes: [
        "id",
        "email",
        "username",
        "nickname",
        "avatar",
        "sex",
        "company",
        "bio",
        "createdAt",
        "updatedAt"
      ]
    });

    res.send({
      status: true,
      message: '查询当前用户信息成功。',
      data: {
        user: user
      }
    });

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).send({
      status: false,
      message: '搜索失败',
      error: error.message
    });
  }
})

/**
 * GET /chapters/{id}
 * 查询章节详情
 */
router.get('/chapters/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const chapter = await Chapters.findByPk(id, {
      attributes: [
        "id", "createdAt", "updatedAt", "title",
        "content", "video", "rank", "courseId"
      ],
      include: [
        {
          model: Courses,
          as: 'chapter_course',
          attributes: ["id", "name", "image", "chaptersCount", "userId"],
          include: [
            {
              model: Users,
              as: 'course_user', // ✅ 关联用户
              attributes: ["id", "username", "nickname", "avatar", "company"]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    if (!chapter) {
      return res.status(404).send({
        status: false,
        message: '章节不存在'
      });
    }

    const chapterData = chapter.toJSON();
    const course = chapterData.chapter_course;
    const user = course?.course_user;

    delete chapterData.chapter_course;
    if (course) {
      delete course.course_user;
    }


    const { rows: chapters } = await Chapters.findAndCountAll({
      where: {
        course_id: course.id,
      },
      attributes: [
        "id",
        "title",
        "rank"
      ],
      order: [['createdAt', 'DESC']],
      subQuery: false
    });

    res.send({
      status: true,
      message: '查询章节详情成功。',
      data: {
        chapter: chapterData,
        course: course,
        user: user,
        chapters: chapters
      }
    });

  } catch (error) {
    console.error('查询失败:', error);
    res.status(500).send({
      status: false,
      message: '查询失败',
      error: error.message
    });
  }
});


module.exports = router;

