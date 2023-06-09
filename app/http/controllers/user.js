const { UserModel } = require("../../models/user");

class UserController{
    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = req.protocol + '://' + req.get('host') + '/' + (user.profile_image).replace(/\\/g, '/');
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
    async uploadProfileImage(req, res, next) {
        try {
            const userId = req.user._id
            const filePath = req.file?.path.replace('\\', '/').substring(7);
            const result = await UserModel.updateOne({_id: userId}, { $set: {profile_image: filePath} });
            if (result.modifiedCount == 0) throw {status: 400, message: 'Upload profile image failed.'};
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Upload profile image successfully'
            });
        } catch (error) {
            next(error);
        }
    } 
    async getAllRequest(req, res, next) {
        try {
            const userId = req.user._id;
            const inviteRequests = await UserModel.aggregate([
                {
                    $match: {_id: userId}
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'inviteRequests.caller',
                        foreignField: 'username',
                        as: 'callerInfo'
                    }
                }
            ]);
            return res.json({
                requests: inviteRequests
            });
        } catch (error) {
            next(error)
        }
    }
    async getRequestsByStatus(req, res, next) {
        try {
            const {status} = req.params;
            const userId = req.user._id;
            const requests = await UserModel.aggregate([
                {
                    $match: {_id: userId}
                },
                {
                    $project: {
                        inviteRequests: 1,
                        _id: 0,
                        inviteRequests: {
                            $filter: {
                                input: '$inviteRequests',
                                as: 'request',
                                cond: {$eq: ['$$request.status', `${status}`]}
                            }
                        }
                    }
                }
            ]);
            return res.status(200).json({
                status: 200,
                success: true,
                requests: requests?.[0]?.inviteRequests || []
            });
        } catch (error) {
            next(error);
        }
    }
    async changeStatusRequest(req, res, next) {
        try {
            const {id, status} = req.params;
            const request = await UserModel.findOne({'inviteRequests._id': id});
            if (!request) throw {status: 404, message: 'Request not found.'};
            const findRequest = request.inviteRequests.find(item => item.id == id);
            if (findRequest.status !== 'pending') throw {status: 400, message: 'Request is not pending.'};
            if (!['approved', 'rejected'].includes(status)) throw {status: 400, message: 'Status is not valid.'};
            const updateResult = await UserModel.updateOne({'inviteRequests._id': id}, {$set: {'inviteRequests.$.status': status}});
            if (updateResult.modifiedCount == 0) throw {status: 500, message: 'Update request failed.'};
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Update request successfully'
            });

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
};