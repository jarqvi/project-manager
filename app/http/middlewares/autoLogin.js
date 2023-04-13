const { tokenVerify } = require("../../modules/functions");
const { UserModel } = require("../../models/user");

const checkLogin = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if (!authorization) throw ({status: 401, message: 'Please login.'});
        let token = authorization;
        if (!token) throw ({status: 401, message: 'Please login.'});
        const result = tokenVerify(token);
        const {username} = result;
        const user = await UserModel.findOne({username}, {password: 0});
        if (!user) throw ({status: 401, message: 'Please login.'});
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkLogin
};