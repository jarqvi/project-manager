const { param } = require("express-validator");

function objectIdValidator() {
    return [
        param('id').isMongoId().withMessage('Invalid id.')
    ];
}

module.exports = {
    objectIdValidator
};