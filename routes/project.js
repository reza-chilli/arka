const router = require('express').Router();
const projectController = require('../controllers/project');
// const projectMiddleware = require('../middlewares/project');

router.get('/', projectController.projectRender);
// router.get('/datatable', projectController.productDataTable);
// router.get('/add-product', projectController.addProductRender);
// router.post('/add-product', projectMiddleware.addProductPostValidate, productController.addProductPostData);


module.exports =router;