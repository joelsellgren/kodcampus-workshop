const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/profileApiController');

router.post('/complete-step', controller.completeStep);

module.exports = router;
