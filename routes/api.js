const router = require('express').Router();

const dashboard = require('./dashboard');
const product = require('./product');
const project = require('./project');
const user = require('./user');
const station = require('./station');
const listOfActions = require('./list-of-actions');

const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth');

// router.use('/auth', function(req, res, next) {
//     if (req.session.user) {
//         return res.redirect('/dashboard');
//     } else {
//         next();
//     }
// })

router.get('/', authController.loginController);
router.post('/login', authMiddleware.loginPostValidate, authController.loginPostController);

router.use('/', authMiddleware.loginCheck);
router.use('/dashboard', dashboard);
router.use('/product', product);
router.use('/project', project);
router.use('/user', user);
router.use('/station', station);
router.use('/list-of-actions', listOfActions);

module.exports = router;