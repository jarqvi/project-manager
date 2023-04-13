const { UserController } = require('../http/controllers/user');
const { checkLogin } = require('../http/middlewares/autoLogin');
const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile);
router.post('/profile', checkLogin, UserController.editProfile);

module.exports = {
    userRoute: router
};