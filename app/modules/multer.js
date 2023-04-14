const multer = require('multer');
const { createUploadPath } = require('./functions');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, createUploadPath());
    },
    filename: function (req, file, cb) {
        const type = path.extname(file?.originalname || '');
        const trueType = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        if (trueType.includes(type)) {
            cb(null, Date.now() + type);
        } else {
            cb(new Error('File format not supported'));
        }
    }
});

const multerUpload = multer({ 
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    } 
});

module.exports = {
    multerUpload
};