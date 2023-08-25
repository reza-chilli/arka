const helpers = require('../helpers');
const userService = require('../services/user');

module.exports = {
  async calenderRenderController (req, res) {
    const user = await userService.findOne({ _id: req.session.details.id });
    const generalContent = await helpers.grabGeneralContentFromLanguage(user.settings.language || 'english');

    const data = {
      error: req.flash("error"),
      success: req.flash("success"),
      generalContent,
    };

    return res.render("dashboard", data);
  },
};
