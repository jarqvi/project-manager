const router = require('express').Router();
const { TeamController } = require('../http/controllers/team');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { createTeamValidator } = require('../http/validations/team');

router.post('/create', checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);
router.get('/get-teams', checkLogin, expressValidatorMapper, TeamController.getListOfTeams);

module.exports = {
    teamRoute: router
};