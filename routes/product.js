const router = require('express').Router();
const productController = require('../controllers/product');
const productMiddleware = require('../middlewares/product');

router.get('/', productController.productDataTableRender);
router.post('/datatable', productController.productDataTable);
router.get('/add-product', productController.addProductRender);
router.get('/add-product/:productId', productController.productRender);
router.post('/add-product', productMiddleware.addProductPostValidate, productController.addProductPostData);
router.post('/delete-product', productMiddleware.deleteProductPostValidate, productController.deleteProductPostData);
router.post('/deactivate-product', productMiddleware.deactivateProductPostValidate, productController.deactivateProductPostData);
router.post('/activate-product', productMiddleware.activateProductPostValidate, productController.activateProductPostData);
router.post('/get-availabe', productController.getAvailableProductPostData)


module.exports =router;