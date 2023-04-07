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
};