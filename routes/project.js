const router = require('express').Router();
const projectController = require('../controllers/project');
const projectMiddleware = require('../middlewares/project');

router.get('/', projectController.projectRender);
router.post('/datatable', projectController.projectDataTable);
router.get('/add-project', projectController.addProjectRender);
router.post('/add-project', projectMiddleware.addProjectPostValidate, projectController.addProjectPostData);


module.exports =router;