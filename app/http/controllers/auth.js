const { hashString } = require("../../modules/functions");
const { UserModel } = require("../../models/user");
const bcrypt = require('bcrypt'); 

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
    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const user = await UserModel.findOne({username});
            if (!user) throw {status: 401, message: 'User or password is incorrect.'};
            const compareResult = bcrypt.compareSync(password, user.password);
            if (!compareResult) throw {status: 401, message: 'User or password is incorrect.'};
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Login successful',
                token: 'token'
            });
        } catch (error) {
            next(error);
        }
    }
    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
};