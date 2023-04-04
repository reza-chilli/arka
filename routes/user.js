const router = require('express').Router();
const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/user');

router.post('/add-user', userMiddleware.addUserPostValidate, userController.addUserPostData);


module.exports =router;