const express = require("express");
const routes = require("./routes");

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registration of all Routes
app.use("/", routes);

module.exports = app;
