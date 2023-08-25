const userService = require("../services/user");

module.exports = {
  async addUserPostData(req, res) {
    try {
      const data = req.body;
      const newUser = await userService.create(data);
      if (newUser) {
        res.status(200).send();
      } else {
        res.status(500).send("something went wrong!");
      }
    } catch (error) {
      console.error(`Error in addUserPostData: ${error}`);
    }
  },
  async settingRender(req, res) {
    try {
    const data = {
      error: req.flash('error'),
      success: req.flash('success'),
    };
      res.render('user/settings', data);
    } catch (error) {
      console.error(`Error in addUserPostData: ${error}`);
    }
  },
  async updateSettingsPostData(req, res) {
    try {
      const user = await userService.findOne({ _id: req.session.details.id });
      if (!user) {
        req.flash('error', 'user not found.');
        return res.redirect('/user/settings');
      }
      const settings = {
        recordPerPage: parseInt(req.body.recordPerPage),
        language: req.body.language,
      };
      const userUpdate = await userService.findOneAndUpdate(
        { _id: req.session.details.id }, 
        { $set: { settings } }, 
        { new: true }
      );

      req.session.details.settings = userUpdate.settings;
      req.session.save((err) => {
        req.session.reload((err) => {
          req.flash('success', 'settings updated successfully');
          return res.redirect('/user/settings');
        });
      });
    } catch (error) {
      console.error(`Error in updateSettingsPostData: ${error}`);    
      req.flash('error', 'Internal Server Error');
      return res.redirect('/user/settings');   
    }
  },
};
