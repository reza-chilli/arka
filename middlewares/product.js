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
            req.flash('error', 'validation failed');
            res.redirect('/auth/login');
        } else {
            next();
        }
    },
    deleteProductPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            req.flash('error', 'validation failed');
            res.redirect('/auth/login');
        } else {
            next();
        }
    },
    deactivateProductPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            req.flash('error', 'validation failed');
            res.redirect('/auth/login');
        } else {
            next();
        }
    },
    activateProductPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            req.flash('error', 'validation failed');
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
}