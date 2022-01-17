const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = () => {
  const app = express();

  app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "igfullstack.com.br");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

  app.use(
    cors({
      origin: "igfullstack.com.br",
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  return app;
};
