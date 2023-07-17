// const authServices = require('../services/auth');

module.exports = {
    calenderRenderController: (req, res) => {
        const data = {
            error: req.flash('error'),
            success: req.flash('success'),
        };
        return res.render('dashboard', data);
    },
}