const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(
    cors({
      origin: "https://sendemail-igfullstack.herokuapp.com/",
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  return app;
};
