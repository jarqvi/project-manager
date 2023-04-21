const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    teamId: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true, toLowerCase: true },
    requestDate: { type: Date, default: new Date() },
    status: { type: String, default: 'pending' }, //pending, approved, rejected
});

const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true, toLowerCase: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String },
    roles: { type: [String], default: ['USER'] },
    skills: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: '' },
    inviteRequests: { type: [InviteSchema]},
});
const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel
};