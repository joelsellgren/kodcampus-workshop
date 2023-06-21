var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/profileWebController');
const { passport } = require('../../utils/passport');

/* GET auth page. */
router.get('/', controller.home);

module.exports = router;
