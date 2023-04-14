const router = require('express').Router();
const { ProjectController } = require('../http/controllers/project');
const { createProjectValidator } = require('../http/validations/project');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');

router.post('/create', checkLogin, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

module.exports = {
    projectRoute: router
};