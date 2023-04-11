const { body } = require('express-validator');

function registerValidator() {
    return [
        body('username').custom((value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if (usernameRegex.test(value)) {
                    return true;
                }
                throw ('Username can only contain letters, numbers, underscores and dots.');
            }
            throw ('Username cannot be empty.');
        }),
        body('email').isEmail().withMessage('Email is not valid.'),
        body('mobile').isMobilePhone('fa-IR').withMessage('Mobile number is not valid.'),
        body('password').isLength({min: 6, max: 16}).withMessage('Password must be between 6 and 16 characters.').custom((value, ctx) => {
            if (!value) throw('Password cannot be empty.');
            if (value !== ctx.req.body.confirmPassword) throw('Passwords do not match.');
            return true;
        }),
    ];
}

module.exports = {
    registerValidator
};