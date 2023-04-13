const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '365 days'});
    return token;
}

function tokenVerify(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result?.username) throw ({status: 401, message: 'Please login.'});
    return result;
}

function createUploadPath() {
    const d = new Date();
    const Year = d.getFullYear().toString();
    const Month = d.getMonth().toString();
    const Day = d.getDate().toString();
    const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads', Year, Month, Day);
    fs.mkdirSync(uploadPath, {recursive: true});
    return path.join('public', 'uploads', Year, Month, Day);
}

module.exports = {
    hashString,
    tokenGenerator,
    tokenVerify,
    createUploadPath
};