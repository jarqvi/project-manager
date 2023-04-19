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
    inviteUserToTeam() {

    }
    removeTeamById() {
        
    }
    UpdateTeam() {
        
    }
    removeUserFromTeam() {
        
    }
}

module.exports = {
    TeamController: new TeamController()
};