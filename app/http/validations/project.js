const {body} = require('express-validator');

function createProjectValidator() {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('text').notEmpty().isLength({min: 20}).withMessage('Text is required and must be at least 20 characters long'),
    ]
}

module.exports = {
    createProjectValidator
};