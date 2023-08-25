const productService = require("../services/product");
const helpers = require('../helpers');
const userService = require('../services/user');

module.exports = {
  async productDataTableRender(req, res) {
    const user = await userService.findOne({ _id: req.session.details.id });
    const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');

    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
      generalContent,
    };
    return res.render("products/product", data);
  },
  async addProductRender(req, res) {
    const user = await userService.findOne({ _id: req.session.details.id });
    const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');

    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
      generalContent,
      code: null,
      title: null,
    };
    return res.render("products/add", data);
  },
  addProductPostData: async (req, res) => {
    try {
      const data = req.body;
      const newProduct = await productService.create(data);

      res.status(200).send(String(newProduct._id));
    } catch (error) {
      console.error(`Error in addProductPostData: ${error}`);
    }
  },
  async productRender(req, res) {
    try {
      const user = await userService.findOne({ _id: req.session.details.id });
      const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');

      const { productId } = req.params;
      let { title, code } = await productService.findOne({ _id: productId });
      code = code.toString();
      const codeLength = code.length;
      if (code.length < 3) {
        for (let i = 0; i < 3 - codeLength; i++) {
          code = "0" + code;
        }
      }
      const data = {
        error: req.flash("error"),
        success: req.flash("success"),
        generalContent,
        title,
        code,
      };
      res.render("products/add", data);
    } catch (error) {
      console.error(`Error in product render: ${error}`);
    }
  },
  async deleteProductPostData(req, res) {
    try {
      const data = req.body;
      const query = {
        _id: { $in: data.ids },
      };
      const deleteProducts = await productService.deleteMany(query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in deleteProductPostData: ${error}`);
    }
  },
  async deactivateProductPostData(req, res) {
    try {
      const body = req.body;
      const data = {
        _id: { $in: body.ids },
      };
      const query = { active: false };
      const deactiveProducts = await productService.updateMany(data, query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in deactivateProductPostData: ${error}`);
    }
  },
  async activateProductPostData(req, res) {
    try {
      const body = req.body;
      const data = {
        _id: { $in: body.ids },
      };
      const query = { active: true };
      const deactiveProducts = await productService.updateMany(data, query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in activateProductPostData: ${error}`);
    }
  },
  async productDataTable(req, res) {
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

      const productCount = await productService.countDocuments({});
      const filteredProductCount = await productService.countDocuments(query);

      const products = await productService.find(query, null, {
        skip: start,
        limit: length,
      });
      const obj = {
        draw: req.body.draw,
        recordsTotal: productCount,
        recordsFiltered: filteredProductCount,
        data: products,
      };
      res.status(200).send(obj);
    } catch (error) {
      console.error(`Error in productDataTable: ${error}`);
    }
  },
  async getAvailableProductPostData(req, res) {
    try {
      const { title } = req.body;
      if (!title || title === "") {
        return res.status(400).send("empty title.");
      }
      const query = {
        title: { $regex: `.*${title}.*` },
      };
      const select = { title: 1 };
      const products = await productService.find(query, select);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send("Internal Server Error.");
    }
  },
};
