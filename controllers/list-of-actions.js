const actionsService = require("../services/list-of-actions");
const stationService = require("../services/station");
const productService = require("../services/product");
const helpers = require('../helpers');
const userService = require('../services/user');

module.exports = {
  async actionsDataTableRender(req, res) {
    const user = await userService.findOne({ _id: req.session.details.id });
    const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');

    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
      generalContent,
    };
    return res.render("list-of-actions/list-of-actions", data);
  },

  async addActionRender(req, res) {
    const user = await userService.findOne({ _id: req.session.details.id });
    const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');
    try {
      const data = {
        error: req.flash("error"),
        success: req.flash("success"),
        generalContent,
        actionData: null,
      };
      return res.render("list-of-actions/add", data);
    } catch (error) {
      console.error(error);
    }
  },

  async actionsDataTable(req, res) {
    try {
      const start = parseInt(req.body.start);
      const length = parseInt(req.body.length);
      const search = req.body.search.value;
      const sanitizedSearch = escape(search);
      const query = {};

      if (search !== "") {
        query.title = { $regex: `.*${sanitizedSearch}.*` };
      }
      if (req.body.status == "active") {
        query.active = true;
      } else if (req.body.status == "deactive") {
        query.active = false;
      }

      const actionsCount = await actionsService.countDocuments({});
      const filteredActionsCount = await actionsService.countDocuments(query);

      const actions = await actionsService.find(query, null, {
        skip: start,
        limit: length,
      });
      const obj = {
        draw: req.query.draw,
        recordsTotal: actionsCount,
        recordsFiltered: filteredActionsCount,
        data: actions,
      };
      res.status(200).send(obj);
    } catch (error) {
      console.error(error);
    }
  },
  async addActionPostData(req, res) {
    try {
      const data = req.body;
      const product = await productService.findOne({
        title: data.productTitle,
      });
      const station = await stationService.findOne({
        title: data.stationTitle,
      });
      if (!product) {
        req.flash("error", "product not fount!");
        return res.redirect("/list-of-actions/add-action");
      }
      if (!station) {
        req.flash("error", "station not fount!");
        return res.redirect("/list-of-actions/add-action");
      }
      data.product = product._id;
      data.station = station._id;
      data.isQualitativeAction = data.type === 'qualitative';
      if (data.isQualitativeAction) {
        data.minimum = "";
        data.maximum = "";
        data.unitOfMeasurement = "";
      }
      const newAction = await actionsService.create(data);

      res.status(200).send(String(newAction._id));
    } catch (error) {
      console.error(`Error in addProductPostData: ${error}`);
      req.flash("error", "internal server error.");
      return res.redirect("/project/add-project");
    }
  },
  // async deleteProjectPostData(req, res) {
  //   try {
  //     const data = req.body;
  //     const query = {
  //       _id: { $in: data.ids },
  //     };
  //     const deleteProjects = await projectService.deleteMany(query);
  //     res.status(200).send();
  //   } catch (error) {
  //     console.error(`Error in deleteProductPostData: ${error}`);
  //   }
  // },
  async deactivateActionPostData(req, res) {
    try {
      const body = req.body;
      const data = {
        _id: { $in: body.ids },
      };
      const query = { active: false };
      const deactiveActions = await actionsService.updateMany(data, query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in deactivateProductPostData: ${error}`);
    }
  },
  async activateActionPostData(req, res) {
    try {
      const body = req.body;
      const data = {
        _id: { $in: body.ids },
      };
      const query = { active: true };
      const deactiveActions = await actionsService.updateMany(data, query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in activateProductPostData: ${error}`);
    }
  },
  // async projectRender(req, res) {
  //   try {
  //     const { projectId } = req.params;
  //     let {
  //       title,
  //       code,
  //       productCount,
  //       firstSerialNumber,
  //       lastSerialNumber,
  //       fixedSerialNumber,
  //       product,
  //     } = await projectService.findOne({ _id: projectId });
  //     code = code.toString();
  //     const codeLength = code.length;
  //     if (code.length < 5) {
  //       for (let i = 0; i < 5 - codeLength; i++) {
  //         code = "0" + code;
  //       }
  //     }
  //     const projectData = {
  //       title,
  //       code,
  //       productCount,
  //       firstSerialNumber,
  //       lastSerialNumber,
  //       fixedSerialNumber,
  //       productTitle: product.title,
  //     };
  //     const data = {
  //       error: req.flash("error"),
  //       success: req.flash("success"),
  //       projectData,
  //     };
  //     res.render("projects/add", data);
  //   } catch (error) {
  //     console.error(`Error in project render: ${error}`);
  //   }
  // },
};
