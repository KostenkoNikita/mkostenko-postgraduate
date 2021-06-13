const path = require('path');

const electronBuildPath = path.join(__dirname, "..", "build");

const reactBuildPath = path.join(electronBuildPath, "view");

module.exports = {
   electronBuildPath,
   reactBuildPath,
};
