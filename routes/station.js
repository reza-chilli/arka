const router = require('express').Router();
// const stationMiddleware = require('../middlewares/station');
const stationController = require('../controllers/station');

router.get('/', stationController.stationDataTableRender);
router.post('/datatable', stationController.stationDataTable);
// router.get('/add-project', projectController.addProjectRender);
// router.post('/add-project', projectMiddleware.addProjectPostValidate, projectController.addProjectPostData);
// router.post('/delete-project', projectMiddleware.deleteProjectPostValidate, projectController.deleteProjectPostData);
// router.post('/deactivate-project', projectMiddleware.deactivateProjectPostValidate, projectController.deactivateProjectPostData);
// router.post('/activate-project', projectMiddleware.activateProjectPostValidate, projectController.activateProjectPostData);


module.exports =router;