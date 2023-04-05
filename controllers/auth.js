const bcrypt = require('bcrypt');

const authServices = require('../services/auth');
const userServices = require('../services/user');

module.exports = {
    loginController: (req, res) => {
        const data = {
            error: req.flash('error'),
            success: req.flash('success'),
        };

        return res.render('login', data);
    },

    async loginPostController(req, res) {
        try {
            const { username, password, rememberMe } = req.body;
            const user = await userServices.findOne({ username });
            if (!user) {
                req.flash('error', 'user not found!');
                return res.redirect('/');
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                req.flash('error', 'incorrect password!');
                return res.redirect('/');
            }
            req.session.details = {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                phoneNumber: user.phoneNumber,
                role: user.role,
            };
            req.flash('success', `welcome to panel ${user.firstname} ${user.lastname}`);
            return res.redirect('/dashboard/calender');
        } catch (error) {
            console.error(`error in loginPostController: ${error}`);
            req.flash('error', 'internal server error!');
            return res.redirect('/');
        }
    },
}