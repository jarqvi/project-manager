const multer = require('multer');
const { createUploadPath } = require('./functions');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, createUploadPath());
    },
    filename: function (req, file, cb) {
        const type = path.extname(file?.originalname || '');
        cb(null, Date.now() + type);
    }
});

const multerUpload = multer({ storage });

module.exports = {
    multerUpload
};