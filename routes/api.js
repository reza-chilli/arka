const router = require('express').Router();
const auth = require('./auth');
const dashboard = require('./dashboard');
const product = require('./product');
const project = require('./project');

// router.use('/auth', function(req, res, next) {
//     if (req.session.user) {
//         return res.redirect('/dashboard');
//     } else {
//         next();
//     }
// })

router.use('/auth', auth);
router.use('/dashboard', dashboard);
router.use('/product', product);
router.use('/project', project);

module.exports = router;