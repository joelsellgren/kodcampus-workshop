var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/usersWebController');
const { requireAuth } = require('../../utils/passport');

/* GET auth page. */
router.get('/:username', requireAuth, controller.home);

module.exports = router;
