const Joi = require('joi');

module.exports = {
    addProjectPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            fixedSerialNumber: Joi.string().required(),
            firstSerialNumber: Joi.string().required(),
            lastSerialNumber: Joi.string().required(),
            title: Joi.string().required(),
            productTitle: Joi.string().required(),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.error('addProjectPostValidate failed');
            req.flash('error', 'validation failed');
            res.redirect('/project/add-project');
        } else {
            next();
        }
    },
    deleteProjectPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            res.status(400).send();
        } else {
            next();
        }
    },
    deactivateProjectPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            res.status(400).send();
        } else {
            next();
        }
    },
    activateProjectPostValidate: (req, res, next) => {
        const rulesSchema = Joi.object({
            ids: Joi.array().items(Joi.string()),
        });

        const validation = rulesSchema.validate(req.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (validation.error) {
            console.log('validation faild', validation.error);
            res.status(400).send();
        } else {
            next();
        }
    }
};