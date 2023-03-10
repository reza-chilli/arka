const projectModel = require('../models/project');

module.exports = {
    async find(query, select, option) {
        try {
            return await projectModel.find(query, select, option);
        } catch (error) {
            console.error(`Error in product find: ${error}`);
            return new Error('something went wrong');
        }
    },

    async countDocuments(query) {
        try {
            return await projectModel.countDocuments(query);
        } catch (error) {
            console.error(`Error in product countDocuments: ${error}`);
            return new Error('something went wrong');
        }
    },
}