const fs = require('fs');
const path = require('path');

module.exports = {
  async grabGeneralContentFromLanguage(lang) {
    const generalContent = {};
    const navbarRaw = fs.readFileSync(path.join(__dirname, './views/partitions/navbar.json'));
    const navbar = JSON.parse(navbarRaw);
    generalContent.navbar = navbar[lang];
    const sidebarRaw = fs.readFileSync(path.join(__dirname, './views/partitions/sidebar.json'));
    const sidebar = JSON.parse(sidebarRaw);
    generalContent.sidebar = sidebar[lang];
    return generalContent;
  },
};
