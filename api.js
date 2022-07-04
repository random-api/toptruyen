const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const hosting = fs.readdirSync(path.join(__dirname, "/scripts")).filter((file) => file.endsWith(".js"));
for (var i of hosting) {
  var { index, name } = require('./scripts/' + i);
  router.get(name, index);
}
module.exports = router;