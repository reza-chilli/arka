const router = require('express').Router();
const projectController = require('../controllers/project');
const projectMiddleware = require('../middlewares/project');

router.get('/', projectController.projectDataTableRender);
router.post('/datatable', projectController.projectDataTable);
router.get('/add-project', projectController.addProjectRender);
router.post('/add-project', projectMiddleware.addProjectPostValidate, projectController.addProjectPostData);
router.get('/add-project/:projectId', projectController.projectRender);
router.post('/delete-project', projectMiddleware.deleteProjectPostValidate, projectController.deleteProjectPostData);
router.post('/deactivate-project', projectMiddleware.deactivateProjectPostValidate, projectController.deactivateProjectPostData);
router.post('/activate-project', projectMiddleware.activateProjectPostValidate, projectController.activateProjectPostData);


module.exports =router;