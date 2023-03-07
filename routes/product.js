const router = require('express').Router();
const productController = require('../controllers/product');
const productMiddleware = require('../middlewares/product');

router.get('/', productController.productRender);
router.get('/datatable', productController.productDataTable);
router.get('/add-product', productController.addProductRender);
router.post('/add-product', productMiddleware.addProductPostValidate, productController.addProductPostData);


module.exports =router;