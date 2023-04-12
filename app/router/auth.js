const { AuthController } = require('../http/controllers/auth');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { registerValidator, loginValidator } = require('../http/validations/auth');
const router = require('express').Router();

router.post('/register', registerValidator(), expressValidatorMapper, AuthController.register);
router.post('/login', loginValidator(), expressValidatorMapper, AuthController.login);

module.exports = {
    authRoute: router
};