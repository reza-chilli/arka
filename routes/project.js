const router = require('express').Router();
const projectController = require('../controllers/project');
// const projectMiddleware = require('../middlewares/project');

router.get('/', projectController.projectRender);
router.get('/datatable', projectController.projectDataTable);
router.get('/add-project', projectController.addProjectRender);
// router.post('/add-product', projectMiddleware.addProductPostValidate, productController.addProductPostData);


module.exports =router;