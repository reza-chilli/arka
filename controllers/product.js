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
    async productDataTable(req, res) {
        try {
            const start = parseInt(req.query.start);
            const length = parseInt(req.query.length);
            const search = req.query.search.value;
            const sanitizedSearch = escape(search);
            const query = {};

            if (search !== '') {
                query.title = { $regex: `.*${sanitizedSearch}.*` };
            }

            const productCount = await productService.countDocuments({});
            const filteredProductCount = await productService.countDocuments(query);

            const products = await productService.find(query, null, { skip: start, limit: length });
            const obj = {
                draw: req.query.draw,
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