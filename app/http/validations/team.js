const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator() {
    return [
        body('name').notEmpty().isLength({min: 5}).withMessage("Team name must be at least 5 characters long."),
        body('description').notEmpty().isLength({min: 10}).withMessage("Team description must be at least 10 characters long."),
        body('username').custom(async (username) =>{
            const regex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;
            if (regex.test(username)) {
                const team = await TeamModel.findOne({username});
                if (team) throw {message: "Team username already exists."};
                return true;
            } 
            throw {message: "Team username must be at least 4 characters long and must start with a letter."}
        })
    ];
}

module.exports = {
    createTeamValidator
};