var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/communityWebController');
const { requireAuth } = require('../../utils/passport');

/* GET auth page. */
router.get('/', requireAuth, controller.home);

module.exports = router;
