const authServices = require('../services/auth');

module.exports = {
    loginController: (req, res) => {
        const data = {
            error: req.flash('err'),
        };

        return res.render('login', data);
    },

    loginPostController: async (req, res) => {
        try {
            const data = req.body;
            console.log(data);
            // const user = await authServices.userLogin(data);
            res.send();
            // if (!user) {

            // } else {

            // }
        } catch (error) {
            
        }
    }
}