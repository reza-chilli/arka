const projectService = require('../services/project');
const productService = require('../services/product');

module.exports = {
    projectRender: (req, res) => {
        const data = {
            error: req.flash('error'),
            success: req.flash('success'),
        };
        return res.render('projects/project', data);
    },

    async addProjectRender(req, res) {
        try {
            const data = {
                error: req.flash('error'),
                success: req.flash('success'),
            };
            return res.render('projects/add', data);
        } catch (error) {
            console.error(error);
        }
    },

    async projectDataTable(req, res) {
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

            const projectCount = await projectService.countDocuments({});
            const filteredProjectCount = await projectService.countDocuments(query);

            const projects = await projectService.find(query, null, { skip: start, limit: length });
            const obj = {
                draw: req.query.draw,
                recordsTotal: projectCount,
                recordsFiltered: filteredProjectCount,
                data: projects,
            };
            res.status(200).send(obj);
        } catch (error) {
            console.error(error);
        }
    },
    async addProjectPostData(req, res) {
        try {
            const data = req.body;
            const product = await productService.findOne({ title: data.productTitle });
            if (!product) {
                req.flash('error', 'product not fount!');
                return res.redirect('/project/add-project');
            }
            data.product = product._id;
            data.productCount = parseInt(data.lastSerialNumber - data.firstSerialNumber + 1);
            const newProject = await projectService.create(data);

            res.status(200).send(String(newProject._id));
        } catch (error) {
            console.error(`Error in addProductPostData: ${error}`);
            req.flash('error', 'internal server error.');
            return res.redirect('/project/add-project');
        }
    },
}