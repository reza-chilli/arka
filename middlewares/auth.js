const Joi = require("joi");

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
      req.flash("error", "validation failed");
      res.redirect("/auth/login");
    } else {
      next();
    }
  },
  async loginCheck(req, res, next) {
    if (!req.session.details) {
      req.flash("error", "please login!");
      return res.redirect("/");
    } else {
      res.locals.firstname = req.session.details.firstname;
      res.locals.lastname = req.session.details.lastname;
      res.locals.settings = req.session.details.settings;
      next();
    }
  },
};
