const userService = require('../services/user');

module.exports = {
    async addUserPostData (req, res) {
        try {
            const data = req.body;
            const newUser = await userService.create(data);
            if (newUser) {
                res.status(200).send();
            } else {
                res.status(500).send('something went wrong!');
            }
        } catch (error) {
            console.error(`Error in addUserPostData: ${error}`);
        }
    },
}