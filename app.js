const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Finance Data Processing API!",
    status: "Backend is live",
    routes: {
      auth: "/auth",
      user: "/user",
      record: "/record",
      category: "/category",
      admin: "/admin",
      dashboard: "/dashboard",
    },
  });
});
app.use("/", routes);

module.exports = app;
