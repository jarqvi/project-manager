const {body} = require('express-validator');

function createProjectValidator() {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('tags').isArray({min: 0, max: 10}).withMessage('Tags must be an array with a maximum of 10 elements'),
        body('text').notEmpty().isLength({min: 20}).withMessage('Text is required and must be at least 20 characters long'),
    ]
}

module.exports = {
    createProjectValidator
};