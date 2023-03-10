const productService = require('../services/product');

module.exports = {
    productRender: (req, res) => {
        return res.render('products/product');
    },
    addProductRender: (req, res) => {
        return res.render('products/add');
    },
    addProductPostData: async (req, res) => {
        try {
            const data = req.body;
            const newProduct = await productService.create(data);
            res.status(200).send();
        } catch (error) {
            console.error(`Error in addProductPostData: ${error}`);
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

            if (search !== '') {
                query.title = { $regex: `.*${sanitizedSearch}.*` };
            }
            if (req.body.status == 'active') {
                query.active = true;
            } else if (req.body.status == 'deactive') {
                query.active = false;
            }

            const productCount = await productService.countDocuments({});
            const filteredProductCount = await productService.countDocuments(query);

            const products = await productService.find(query, null, { skip: start, limit: length });
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
    }
}