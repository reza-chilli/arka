const Joi = require("joi");

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
      req.flash("error", "validation failed");
      res.redirect("/");
    } else {
      next();
    }
  },
  updateSettingsPostValidate: (req, res, next) => {
    const rulesSchema = Joi.object({
      recordPerPage: Joi.string().required().valid("10", "25", "50", "100"),
    });

    const validation = rulesSchema.validate(req.body, {
      allowUnknown: false,
      abortEarly: false,
    });

    if (validation.error) {
      req.flash("error", "validation failed");
      res.redirect("/");
    } else {
      next();
    }
  },
};
