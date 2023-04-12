const { validationResult } = require("express-validator");
const { hashString } = require("../../modules/functions");
const { UserModel } = require("../../models/user"); 

class AuthController{
    async register(req, res, next) {
        try {
            const {username, password, email, mobile} = req.body;
            const hashedPassword = hashString(password);
            const user = await UserModel.create({ username, email, mobile, password: hashedPassword });
        return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    login() {

    }
    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
};