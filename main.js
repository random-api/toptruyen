'use strict';
const express = require("express");
const cors = require("cors");
const api = require("./api.js");
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(cors());

app.use("/", api);
app.set("json spaces", 4)
app.use((error, req, res, next) => {
  res.status(error.status).json({ message: error.message });
});
(async () => {
  app.listen(process.env.PORT || 995);
  console.log('\x1b[92m[ START ] -> Connect to data successfully!');
})();