const projectModel = require('../models/project');

module.exports = {
    async find(query, select, option) {
        try {
            return await projectModel.find(query, select, option).populate('product');
        } catch (error) {
            console.error(`Error in product find: ${error}`);
            return new Error('something went wrong');
        }
    },

    async countDocuments(query) {
        try {
            return await projectModel.countDocuments(query);
        } catch (error) {
            console.error(`Error in project countDocuments: ${error}`);
            return new Error('something went wrong');
        }
    },

    async create(data) {
        try {
            data.code = await this.getLastProjectCode() + 1;

            const newProject = await projectModel.create(data);
            if (newProject && !(newProject instanceof Error)) {
                return newProject;
            } else {
                return new Error('something went wrong');
            }
        } catch (error) {
            console.error(`Error in project create: ${error}`);
            return new Error('something went wrong'); 
        }
    },

    async getLastProjectCode() {
        try {
            const lastProject = await projectModel.find({}).sort({ code: -1 }).limit(1);
            if (lastProject.length) {
                return lastProject[0].code;
            } else {
                return 0;
            }

        } catch (error) {
            console.error(`Error in project getLastProjectCode: ${error}`);
        }
    },
    async deleteMany(data) {
        try {
            return await projectModel.deleteMany(data);
        } catch (error) {
            console.error(`Error in project deleteMany: ${error}`);
            return new Error('something went wrong');
        }
    },
    async updateMany(data, query, option) {
        try {
            return await projectModel.updateMany(data, query, option);
        } catch (error) {
            console.error(`Error in project updateMany: ${error}`);
            return new Error('something went wrong'); 
        }
    },
    async findOne(query, select, option) {
        try {
            return await projectModel.findOne(query, select, option).populate('product');
        } catch (error) {
            console.error(`Error in project findOne: ${error}`);
            return new Error('something went wrong');
        }
    },
}