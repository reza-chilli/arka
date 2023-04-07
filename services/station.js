const stationModel = require('../models/station');

module.exports = {
    async create(data) {
        try {
            data.code = await this.getLastStationCode() + 1;
            const newStation = await stationModel.create(data);

            if (newStation && !(newStation instanceof Error)) {
                return newStation;
            } else {
                return new Error('something went wrong');
            }
        } catch (error) {
            console.error(`Error in station create: ${error}`);
            return new Error('something went wrong');
        }
    },
    async find(query, select, option) {
        try {
            return await stationModel.find(query, select, option).populate('product');
        } catch (error) {
            console.error(`Error in station find: ${error}`);
            return new Error('something went wrong');
        }
    },
    async findOne(query, select, option) {
        try {
            return await stationModel.findOne(query, select, option);
        } catch (error) {
            console.error(`Error in station findOne: ${error}`);
            return new Error('something went wrong');
        }
    },
    async deleteMany(data) {
        try {
            return await stationModel.deleteMany(data);
        } catch (error) {
            console.error(`Error in station deleteMany: ${error}`);
            return new Error('something went wrong');
        }
    },
    async updateMany(data, query, option) {
        try {
            return await stationModel.updateMany(data, query, option);
        } catch (error) {
            console.error(`Error in station updateMany: ${error}`);
            return new Error('something went wrong'); 
        }
    },
    async countDocuments(query) {
        try {
            return await stationModel.countDocuments(query);
        } catch (error) {
            console.error(`Error in station countDocuments: ${error}`);
            return new Error('something went wrong');
        }
    },
    async getLastStationCode() {
        try {
            const lastStation = await stationModel.find({}).sort({ code: -1 }).limit(1);
            if (lastStation.length) {
                return lastStation[0].code;
            } else {
                return 0;
            }

        } catch (error) {
            console.error(`Error in station create: ${error}`);
            return new Error('something went wrong');
        }
    },
};