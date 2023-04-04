const Joi = require('joi');

module.exports = {
    addUserPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            role: Joi.string().required(),
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
    },
}