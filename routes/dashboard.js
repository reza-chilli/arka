const router = require('express').Router();
const dashboardController = require('../controllers/dashboard');

router.get('/calender', dashboardController.calenderRenderController);

module.exports =router;