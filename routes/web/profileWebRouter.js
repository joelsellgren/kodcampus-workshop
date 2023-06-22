var express = require('express');
var router = express.Router();
const controller = require('../../controllers/web/profileWebController');
const { requireAuth } = require('../../utils/passport');

/* GET auth page. */
router.get('/', requireAuth, controller.home);
router.post('/start-path/:id', requireAuth, controller.startPath);

module.exports = router;
