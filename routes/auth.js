const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth');

router.get('/login', authController.loginController);
router.post('/login', authMiddleware.loginPostValidate, authController.loginPostController);

module.exports = router;