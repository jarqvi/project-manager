const { TeamModel } = require("../../models/team");

class TeamController{
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
            const teams = await TeamModel.find({
                $or: [
                    {owner: userId},
                    {users: userId}
                ]
            });
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
    inviteUserToTeam() {

    }
    UpdateTeam() {
        
    }
    removeUserFromTeam() {
        
    }
}

module.exports = {
    TeamController: new TeamController()
};