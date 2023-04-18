const router = require('express').Router();
const { ProjectController } = require('../http/controllers/project');
const { createProjectValidator, updateProjectValidator } = require('../http/validations/project');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { uploadFile } = require('../modules/expressFileUpload');
const fileUpload = require('express-fileupload');
const { objectIdValidator } = require('../http/validations/public');

router.post('/create', fileUpload(), checkLogin, createProjectValidator(), expressValidatorMapper, uploadFile, ProjectController.createProject);
router.get('/my-projects', checkLogin, ProjectController.getAllProject);
router.get('/my-project/:id', checkLogin, objectIdValidator(), expressValidatorMapper, ProjectController.getAllProjectById);
router.delete('/rm-project/:id', checkLogin, objectIdValidator(), expressValidatorMapper, ProjectController.removeProject);
router.put("/edit/:id", checkLogin, objectIdValidator(), expressValidatorMapper,ProjectController.updateProject);
router.patch("/edit-projectImage/:id", fileUpload(), checkLogin, uploadFile, objectIdValidator(), expressValidatorMapper,ProjectController.updateProjectImage);

module.exports = {
    projectRoute: router
};