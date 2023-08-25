const stationService = require("../services/station");
const productService = require("../services/product");

module.exports = {
  stationDataTableRender: function (req, res) {
    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
    };
    return res.render("stations/station", data);
  },
  addStationRender: function (req, res) {
    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
      code: null,
      title: null,
    };
    return res.render("stations/add", data);
  },
  async addStationPostData(req, res) {
    try {
      const data = req.body;
      const product = await productService.findOne({
        title: data.productTitle,
      });
      if (!product) {
        return res.status(400).send("product not found.");
      }
      data.product = product._id;
      const newStation = await stationService.create(data);

      res.status(200).send(String(newStation._id));
    } catch (error) {
      console.error(`Error in addProductPostData: ${error}`);
    }
  },
  // async productRender(req, res) {
  //     try {
  //         const { productId } = req.params;
  //         let { title, code } = await productService.findOne({ _id: productId });
  //         code = code.toString();
  //         const codeLength = code.length;
  //         if (code.length < 3) {
  //             for (let i = 0; i < 3 - codeLength; i++) {
  //                 code = '0' + code;
  //             }
  //         }
  //         const data = {
  //             error: req.flash('error'),
  //             success: req.flash('success'),
  //             title,
  //             code,
  //         };
  //         res.render('products/add', data);
  //     } catch (error) {
  //         console.error(`Error in product render: ${error}`);
  //     }
  // },
  // async deleteProductPostData(req, res) {
  //     try {
  //         const data = req.body;
  //         const query = {
  //             _id: { $in: data.ids },
  //         };
  //         const deleteProducts = await productService.deleteMany(query);
  //         res.status(200).send();
  //     } catch (error) {
  //         console.error(`Error in deleteProductPostData: ${error}`);
  //     }
  // },
  async deactivateProductPostData(req, res) {
    try {
      const body = req.body;
      const data = {
        _id: { $in: body.ids },
      };
      const query = { active: false };
      const deactiveStations = await stationService.updateMany(data, query);
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
      const deactiveStations = await stationService.updateMany(data, query);
      res.status(200).send();
    } catch (error) {
      console.error(`Error in activateProductPostData: ${error}`);
    }
  },
  async stationDataTable(req, res) {
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

      const stationCount = await stationService.countDocuments({});
      const filteredStationCount = await stationService.countDocuments(query);

      const stations = await stationService.find(query, null, {
        skip: start,
        limit: length,
      });
      const obj = {
        draw: req.body.draw,
        recordsTotal: stationCount,
        recordsFiltered: filteredStationCount,
        data: stations,
      };
      return res.status(200).send(obj);
    } catch (error) {
      console.error(`Error in stationDataTable: ${error}`);
      return res.status(500).send("Internal Server Error.");
    }
  },
  async getAvailableStationPostData(req, res) {
    try {
      const { title } = req.body;
      if (!title || title === "") {
        return res.status(400).send("empty title.");
      }
      const query = {
        title: { $regex: `.*${title}.*` },
      };
      const select = { title: 1 };
      const stations = await stationService.find(query, select);
      res.status(200).send(stations);
    } catch (error) {
      res.status(500).send("Internal Server Error.");
    }
  },
};
