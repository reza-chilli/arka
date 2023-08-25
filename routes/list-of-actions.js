const router = require('express').Router();
const listOfActionsController = require('../controllers/list-of-actions');
const listOfActionsMiddleware = require('../middlewares/list-of-actions');

router.get('/', listOfActionsController.actionsDataTableRender);
router.post('/datatable', listOfActionsController.actionsDataTable);
router.get('/add-action', listOfActionsController.addActionRender);
router.post('/add-action', listOfActionsMiddleware.addActionPostValidate, listOfActionsController.addActionPostData);
// router.get('/add-project/:projectId', projectController.projectRender);
// router.post('/delete-project', projectMiddleware.deleteProjectPostValidate, projectController.deleteProjectPostData);
// router.post('/deactivate-project', projectMiddleware.deactivateProjectPostValidate, projectController.deactivateProjectPostData);
// router.post('/activate-project', projectMiddleware.activateProjectPostValidate, projectController.activateProjectPostData);


module.exports =router;