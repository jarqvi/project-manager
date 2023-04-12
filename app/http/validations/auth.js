const { UserModel } = require("../../models/user"); 
const { body } = require('express-validator');

function registerValidator() {
    return [
        body('username').custom(async (value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if (usernameRegex.test(value)) {
                    const user = await UserModel.findOne({username: value});
                    if (user) throw ('Username already exists.'); 
                    return true;
                }
                throw ('Username can only contain letters, numbers, underscores and dots.');
            } else {
                throw ('Username cannot be empty.');
            }
        }),
        body('email').isEmail().withMessage('Email is not valid.').custom(async email => {
            const user = await UserModel.findOne({email});
            if (user) throw ('Email already exists.');
            return true;
        }),
        body('mobile').isMobilePhone('fa-IR').withMessage('Mobile number is not valid.').custom(async mobile => {
            const user = await UserModel.findOne({mobile});
            if (user) throw ('Mobile already exists.');
            return true;
        }),
        body('password').isLength({min: 6, max: 16}).withMessage('Password must be between 6 and 16 characters.').custom((value, ctx) => {
            if (!value) throw('Password cannot be empty.');
            if (value !== ctx.req.body.confirmPassword) throw('Passwords do not match.');
            return true;
        }),
        (req, res, next) => {
            const validFields = ['username', 'password', 'first_name', 'last_name', 'email', 'mobile', 'roles', 'skills', 'team', 'confirmPassword'];
            const invalidFields = Object.keys(req.body).filter(
                field => !validFields.includes(field)
            );
            if (invalidFields.length) {
                return res.status(400).json({
                    error: `Invalid field: ${invalidFields.join(', ')}`
                });
            }
            next();
        }
    ];
}

function loginValidator() {
    return [
        body('username').notEmpty().withMessage('Username cannot be empty.').custom(async username => {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if (usernameRegex.test(username)) { 
                    return true;
                }
                throw ('Username or password is incorrect.');
        }),
        body('password').isLength({min: 6, max: 16}).withMessage('Password must be between 6 and 16 characters.'),
        (req, res, next) => {
            const validFields = ['username', 'password'];
            const invalidFields = Object.keys(req.body).filter(
                field => !validFields.includes(field)
            );
            if (invalidFields.length) {
                return res.status(400).json({
                    error: `Invalid field: ${invalidFields.join(', ')}`
                });
            }
            next();
        }
    ];
}

module.exports = {
    registerValidator,
    loginValidator
};