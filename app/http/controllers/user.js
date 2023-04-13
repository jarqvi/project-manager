const { UserModel } = require("../../models/user");

class UserController{
    getProfile(req, res, next) {
        try {
            const user = req.user;
            return res.status(200).json({
                status: 200,
                success: true,
                user
            });
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = req.body;
            const userId = req.body._id;
            let fields = ['first_name', 'last_name', 'skills'];
            let badValue = ['', ' ', null, undefined, NaN, false, 0, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                console.log(key, value);
                if (!fields.includes(key)) delete data[key];
                if (badValue.includes(value)) delete data[key];
            });
            console.log(data);
            const result = await UserModel.updateOne({ _id: userId }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Update profile successfully'
                });
            } else {
                throw {status: 400, message: 'Update profile failed.'}
            }
        } catch (error) {
            next(error);
        }
    }
    addSkills() {
        
    }
    editSkills() {
        
    }
    acceptInviteInTeam() {
        
    }
    rejectInviteInTeam() {
        
    }
}

module.exports = {
    UserController: new UserController()
};