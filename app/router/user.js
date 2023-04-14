const { UserController } = require('../http/controllers/user');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { multerUpload } = require('../modules/multer');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { imageValidator } = require('../http/validations/user');
const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile);
router.post('/profile', checkLogin, UserController.editProfile);
router.post('/profile-image', checkLogin, multerUpload.single('image'), imageValidator(), expressValidatorMapper, UserController.uploadProfileImage);

module.exports = {
    userRoute: router
};