const Joi = require('joi');

module.exports = {
    addProductPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            title: Joi.string().required(),
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