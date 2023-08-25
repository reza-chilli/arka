const Joi = require("joi");

module.exports = {
  addActionPostValidate: (req, res, next) => {
    const rulesSchema = Joi.object({
      title: Joi.string().required(),
      productTitle: Joi.string().required(),
      stationTitle: Joi.string().required(),
      type: Joi.string().required(),
      minimum: Joi.string().optional().allow(""),
      maximum: Joi.string().optional().allow(""),
      unitOfMeasurement: Joi.string().optional().allow(""),
    });

    const validation = rulesSchema.validate(req.body, {
      allowUnknown: false,
      abortEarly: false,
    });

    if (validation.error) {
      console.log(validation);
      console.error("addActionPostValidate failed");
      req.flash("error", "validation failed");
      res.redirect("/list-of-actions/add-action");
    } else {
      next();
    }
  },
  // deleteProjectPostValidate: (req, res, next) => {
  //   const rulesSchema = Joi.object({
  //     ids: Joi.array().items(Joi.string()),
  //   });

  //   const validation = rulesSchema.validate(req.body, {
  //     allowUnknown: false,
  //     abortEarly: false,
  //   });

  //   if (validation.error) {
  //     console.log("validation faild", validation.error);
  //     res.status(400).send();
  //   } else {
  //     next();
  //   }
  // },
  deactivateActionPostValidate: (req, res, next) => {
    const rulesSchema = Joi.object({
      ids: Joi.array().items(Joi.string()),
    });

    const validation = rulesSchema.validate(req.body, {
      allowUnknown: false,
      abortEarly: false,
    });

    if (validation.error) {
      console.log("validation faild", validation.error);
      res.status(400).send();
    } else {
      next();
    }
  },
  activateActionPostValidate: (req, res, next) => {
    const rulesSchema = Joi.object({
      ids: Joi.array().items(Joi.string()),
    });

    const validation = rulesSchema.validate(req.body, {
      allowUnknown: false,
      abortEarly: false,
    });

    if (validation.error) {
      console.log("validation faild", validation.error);
      res.status(400).send();
    } else {
      next();
    }
  },
};
