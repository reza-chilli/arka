const userModel = require("../models/user");

module.exports = {
  async create(data) {
    try {
      const user = await userModel.create(data);

      if (user && !(user instanceof Error)) {
        return user;
      } else {
        return new Error("something went wrong");
      }
    } catch (error) {
      console.error(`Error in user create: ${error}`);
      return new Error("something went wrong");
    }
  },
  async findOne(query, select, option) {
    try {
      return await userModel.findOne(query, select, option);
    } catch (error) {
      console.error(`Error in user findOne: ${error}`);
      return new Error("something went wrong");
    }
  },
  async findOneAndUpdate(condition, data, option) {
    try {
      return await userModel.findOneAndUpdate(condition, data, option);
    } catch (error) {
      console.error(`Error in user findOne: ${error}`);
      return new Error("something went wrong");
    }
  },
};
