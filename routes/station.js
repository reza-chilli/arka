const router = require('express').Router();
const stationMiddleware = require('../middlewares/station');
const stationController = require('../controllers/station');

router.get('/', stationController.stationDataTableRender);
router.post('/datatable', stationController.stationDataTable);
router.get('/add-station', stationController.addStationRender);
router.post('/add-station', stationMiddleware.addStationPostValidate, stationController.addStationPostData);
router.post('/get-availabe', stationController.getAvailableStationPostData);
// router.post('/delete-project', projectMiddleware.deleteProjectPostValidate, projectController.deleteProjectPostData);
// router.post('/deactivate-project', projectMiddleware.deactivateProjectPostValidate, projectController.deactivateProjectPostData);
// router.post('/activate-project', projectMiddleware.activateProjectPostValidate, projectController.activateProjectPostData);

module.exports =router;