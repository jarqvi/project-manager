const router = require('express').Router();
const { ProjectController } = require('../http/controllers/project');
const { createProjectValidator } = require('../http/validations/project');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { uploadFile } = require('../modules/expressFileUpload');
const fileUpload = require('express-fileupload');

router.post('/create', fileUpload(), checkLogin, createProjectValidator(), expressValidatorMapper, uploadFile, ProjectController.createProject);

module.exports = {
    projectRoute: router
};