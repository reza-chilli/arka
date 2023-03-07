const Joi = require('joi');

module.exports = {
    loginPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            rememberMe: Joi.string(),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            req.flash('err', 'validation failed');
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
}