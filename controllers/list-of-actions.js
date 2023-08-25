const actionsService = require("../services/list-of-actions");

module.exports = {
  async actionsDataTableRender(req, res) {
    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
    };
    return res.render("list-of-actions/list-of-actions", data);
  },

  async addActionRender(req, res) {
    try {
      const data = {
        error: req.flash("error"),
        success: req.flash("success"),
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
  // async addProjectPostData(req, res) {
  //   try {
  //     const data = req.body;
  //     const product = await productService.findOne({
  //       title: data.productTitle,
  //     });
  //     if (!product) {
  //       req.flash("error", "product not fount!");
  //       return res.redirect("/project/add-project");
  //     }
  //     data.product = product._id;
  //     data.productCount = parseInt(
  //       data.lastSerialNumber - data.firstSerialNumber + 1
  //     );
  //     const newProject = await projectService.create(data);

  //     res.status(200).send(String(newProject._id));
  //   } catch (error) {
  //     console.error(`Error in addProductPostData: ${error}`);
  //     req.flash("error", "internal server error.");
  //     return res.redirect("/project/add-project");
  //   }
  // },
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
  // async deactivateProjectPostData(req, res) {
  //   try {
  //     const body = req.body;
  //     const data = {
  //       _id: { $in: body.ids },
  //     };
  //     const query = { active: false };
  //     const deactiveProjects = await projectService.updateMany(data, query);
  //     res.status(200).send();
  //   } catch (error) {
  //     console.error(`Error in deactivateProductPostData: ${error}`);
  //   }
  // },
  // async activateProjectPostData(req, res) {
  //   try {
  //     const body = req.body;
  //     const data = {
  //       _id: { $in: body.ids },
  //     };
  //     const query = { active: true };
  //     const deactiveProjects = await projectService.updateMany(data, query);
  //     res.status(200).send();
  //   } catch (error) {
  //     console.error(`Error in activateProductPostData: ${error}`);
  //   }
  // },
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
