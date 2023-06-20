var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/loginWebController');

/* GET auth page. */
router.get('/', controller.home);
router.post('/register', controller.registerUser);

module.exports = router;
