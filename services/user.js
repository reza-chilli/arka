const userModel = require('../models/user');

module.exports = {
    async create(data) {
        try {
            const user = await userModel.create(data);

            if (user && !(user instanceof Error)) {
                return user;
            } else {
                return new Error('something went wrong');
            }
        } catch (error) {
            console.error(`Error in user create: ${error}`);
            return new Error('something went wrong');
        }
    },
};