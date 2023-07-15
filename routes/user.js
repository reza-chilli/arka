const router = require('express').Router();
const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/user');

router.post('/add-user', userMiddleware.addUserPostValidate, userController.addUserPostData);
router.get('/settings', userController.settingRender);
router.post('/update-settings', userMiddleware.updateSettingsPostValidate, userController.updateSettingsPostData);


module.exports =router;