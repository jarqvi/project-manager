const fileUpload = require('express-fileupload');
const path = require('path');
const {createUploadPath} = require('./functions');

const uploadFile = async(req, res, next) => {
    try {
        if (req.file || Object.keys(req.files).length == 0) throw {status: 400, message: 'No files were uploaded.'};
        let image = req.files.image;
        const imagePath = path.join(createUploadPath(), (Date.now() + path.extname(image.name)));
        req.body.image = imagePath;
        let uploadPath = path.join(__dirname, '..', '..', imagePath);   
        image.mv(uploadPath, (err) => {
            if (err) throw {status: 500, message: 'Error uploading file.'};
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile
};