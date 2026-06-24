const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('邮箱格式不正确')
        .notEmpty()
        .withMessage('邮箱不能为空')
        .normalizeEmail(),

    body('username')
        .isLength({ min: 3, max: 20 })
        .withMessage('用户名长度必须在3-20个字符之间')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('用户名只能包含字母、数字和下划线'),

    body('nickname')
        .isLength({ min: 2, max: 20 })
        .withMessage('昵称长度必须在2-20个字符之间'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('密码长度不能少于6位')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: '验证失败',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateRegister,
    handleValidationErrors
};