const projectService = require('../services/project');

module.exports = {
    projectRender: (req, res) => {
        return res.render('projects/project');
    },

    async addProjectRender(req, res) {
        try {
            return res.render('projects/add');
        } catch (error) {
            console.error(error);
        }
    },

    async projectDataTable(req, res) {
        try {
            const start = parseInt(req.query.start);
            const length = parseInt(req.query.length);
            const search = req.query.search.value;
            const sanitizedSearch = escape(search);
            const query = {};

            if (search !== '') {
                query.title = { $regex: `.*${sanitizedSearch}.*` };
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
}