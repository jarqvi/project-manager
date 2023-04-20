const router = require('express').Router();
const { TeamController } = require('../http/controllers/team');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { objectIdValidator } = require('../http/validations/public');
const { createTeamValidator } = require('../http/validations/team');

router.post('/create', checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);
router.get('/get-teams', checkLogin, expressValidatorMapper, TeamController.getListOfTeams);
router.get('/get-team/:id', checkLogin, objectIdValidator(), expressValidatorMapper, TeamController.getTeamById);
router.get('/me', checkLogin, TeamController.getMyTeams);
router.delete('/remove/:id', checkLogin, objectIdValidator(), expressValidatorMapper, TeamController.removeTeamById);

module.exports = {
    teamRoute: router
};