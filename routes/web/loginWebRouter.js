var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/loginWebController');
const { passport } = require('../../utils/passport');

/* GET auth page. */
router.get('/', controller.home);
router.post(
    '/',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: {
            type: 'danger',
            message: 'Incorrect username or password',
        },
    }),
    controller.loginUser
);

router.post('/register', controller.registerUser);

module.exports = router;
