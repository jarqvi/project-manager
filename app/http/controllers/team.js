const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");
const autoBind = require('auto-bind');

class TeamController{
    constructor() {
        autoBind(this)
    }
    async createTeam(req, res, next) {
        try {
            const {name, description, username} = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({
                name,
                description,
                username,
                owner
            });
            if (!team) throw {status: 500, message: "Team not created."};
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Team created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }
    async getListOfTeams(req, res, next) {
        try {
            const teams = await TeamModel.find({owner: req.user._id});
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            });
        } catch (error) {
            next(error);
        }
    }
    async getTeamById(req, res, next) {
        try {
            const teamId = req.params.id;
            const team = await TeamModel.findById(teamId);
            if (!team) throw {status: 404, message: "Team not found."};
            return res.status(200).json({
                status: 200,
                success: true,
                team
            });
        } catch (error) {
            next(error);
        }
    }
    async getMyTeams(req, res, next) {
        try {
            const userId = req.user._id;
            const teams = await TeamModel.aggregate([
                {
                    $match: {
                        $or: [
                            {owner: userId},
                            {users: userId}
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                        'owner.roles': 0,
                        'owner.password': 0,
                        'owner.token': 0,
                        'owner.inviteRequests': 0,
                        'owner.teams': 0,
                        'owner.skills': 0,
                    }
                },
                {
                    $unwind: "$owner"
                }
            ]);
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            });
        } catch (error) {
            next(error);
        }
    }
    async removeTeamById(req, res, next) {
        try {
            const teamId = req.params.id;
            const team = await TeamModel.findByIdAndDelete(teamId);
            if (!team) throw {status: 404, message: "Team not found."};
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Team deleted successfully."
            });
        } catch (error) {
            next(error);
        }
    }
    async findUserInTeam(teamId, userId) {
        const result = await TeamModel.findOne({$or: [{owner: userId}, {users: userId}], _id: teamId});
        return !!result;
    }
    async inviteUserToTeam(req, res, next) {
        try {
            const userId = req.user._id;
            const {username, teamId} = req.params;
            const team = await this.findUserInTeam(teamId, userId);
            if (!team) throw {status: 400, message: "Team for invite users not found."};
            const user = await UserModel.findOne({username});
            if (!user) throw {status: 400, message: "User not found."};
            const userInvited = await this.findUserInTeam(teamId, user._id);
            if (userInvited) throw {status: 400, message: "User already invited to this team."};
            const request = {
                caller: req.user.username,
                requestDate: new Date,
                teamId,
                status: 'pending'
            };
            const updateUserResult = await UserModel.updateOne({username},{
                $push: {inviteRequests: request}
            });
            if (updateUserResult.modifiedCount == 0) throw {status: 500, message: "User not updated."};
            return res.status(200).json({
                status: 200,
                success: true,
                message: "User invited successfully."
            });
        } catch (error) {
            next(error);
        }
    }
    async UpdateTeam(req, res, next) {
        try {
            const data = {...req.body};
            Object.keys(data).forEach(key => {
                if (!data[key]) delete data[key];
                if (['', ' ', undefined, null, NaN].includes(data[key])) delete data[key];
            });
            const userId = req.user._id;
            const {teamId} = req.params;
            const team = await TeamModel.findOne({owner: userId, _id: teamId});
            if (!team) throw {status: 404, message: "Team not found."};
            const teamEditResult = await TeamModel.updateOne({_id: teamId}, data);
            if (teamEditResult.modifiedCount == 0) throw {status: 500, message: "Team not updated."};
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Team updated successfully."
            });
        } catch (error) {
            next(error);
        }
    }
    removeUserFromTeam() {
        
    }
}

module.exports = {
    TeamController: new TeamController()
};