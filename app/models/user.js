const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: String, default: ['USER'] },
    skills: { type: String, default: [] },
    team: { type: String, default: [] }
});
const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserSchema
};