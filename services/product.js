const productModel = require('../models/product');

module.exports = {
    async create(data) {
        try {
            data.code = await this.getLastProductCode() + 1;
            const product = await productModel.create(data);

            if (product && !(product instanceof Error)) {
                return product;
            } else {
                return new Error('something went wrong');
            }
        } catch (error) {
            console.error(`Error in product create: ${error}`);
            return new Error('something went wrong');
        }
    },
    async find(query, select, option) {
        try {
            return await productModel.find(query, select, option);
        } catch (error) {
            console.error(`Error in product find: ${error}`);
            return new Error('something went wrong');
        }
    },
    async findOne(query, select, option) {
        try {
            return await productModel.findOne(query, select, option);
        } catch (error) {
            console.error(`Error in product findOne: ${error}`);
            return new Error('something went wrong');
        }
    },
    async deleteMany(data) {
        try {
            return await productModel.deleteMany(data);
        } catch (error) {
            console.error(`Error in product deleteMany: ${error}`);
            return new Error('something went wrong');
        }
    },
    async updateMany(data, query, option) {
        try {
            return await productModel.updateMany(data, query, option);
        } catch (error) {
            console.error(`Error in product updateMany: ${error}`);
            return new Error('something went wrong'); 
        }
    },
    async countDocuments(query) {
        try {
            return await productModel.countDocuments(query);
        } catch (error) {
            console.error(`Error in product countDocuments: ${error}`);
            return new Error('something went wrong');
        }
    },
    async getLastProductCode() {
        try {
            const lastProduct = await productModel.find({}).sort({ code: -1 }).limit(1);
            if (lastProduct.length) {
                return lastProduct[0].code;
            } else {
                return 0;
            }

        } catch (error) {
            console.error(`Error in product create: ${error}`);
        }
    },
};