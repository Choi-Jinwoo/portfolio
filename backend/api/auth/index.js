const authCtrl = require('./auth.ctrl');
const authMiddleware = require('../../middleware/auth');
const router = require('express').Router();

router.post('/login', authCtrl.login);
router.post('/sign-up', authCtrl.signUp);
module.exports = router;