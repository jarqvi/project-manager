const { body } = require("express-validator");
const path = require('path');

function imageValidator() {
    return [
        body('image').custom((image, { req }) => {
            if (Object.keys(req.file).length == 0) throw 'No file was uploaded.';
            const ext = path.extname(req.file.originalname);
            const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            const maxSize = 2 * 1024 * 1024;
            if (!exts.includes(ext)) throw 'Only image files are allowed.';
            if (req.file.size > maxSize) throw 'Image size must be less than 2MB.';
            return true;
        })
    ];
}

module.exports = {
    imageValidator
};