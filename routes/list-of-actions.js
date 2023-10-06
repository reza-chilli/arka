const router = require('express').Router();
const listOfActionsController = require('../controllers/list-of-actions');
const listOfActionsMiddleware = require('../middlewares/list-of-actions');

router.get('/', listOfActionsController.actionsDataTableRender);
router.post('/datatable', listOfActionsController.actionsDataTable);
router.get('/add-action', listOfActionsController.addActionRender);
router.post('/add-action', listOfActionsMiddleware.addActionPostValidate, listOfActionsController.addActionPostData);
// router.get('/add-project/:projectId', projectController.projectRender);
router.post('/delete-action', listOfActionsMiddleware.deleteActionPostValidate, listOfActionsController.deleteActionPostData);
router.post('/deactivate-action', listOfActionsMiddleware.deactivateActionPostValidate, listOfActionsController.deactivateActionPostData);
router.post('/activate-action', listOfActionsMiddleware.activateActionPostValidate, listOfActionsController.activateActionPostData);


module.exports =router;