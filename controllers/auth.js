const bcrypt = require('bcrypt');

const authServices = require('../services/auth');
const userServices = require('../services/user');

module.exports = {
    loginController: (req, res) => {
        if (req.session.details) {
            req.flash('error', 'you are already authenticated! please logout to start a new session.');
            return res.redirect('/dashboard');
        }

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
                settings: user.settings,
            };
            req.flash('success', `welcome to panel ${user.firstname} ${user.lastname}`);
            return res.redirect('/dashboard');
        } catch (error) {
            console.error(`error in loginPostController: ${error}`);
            req.flash('error', 'internal server error!');
            return res.redirect('/');
        }
    },
}